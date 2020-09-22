const path = require('path')
const express = require('express')
const hbs = require('hbs');             //partials -> allows u to create little template which is part of bigger webpage (parts like header and footer....we use them everywhere on our webpage without writing them again n again)


const forecast = require('./utils/forecast');
const geoCode = require('./utils/geoCode')

const port = process.env.PORT || 3000

const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

// define path for express config
const viewPath = path.join(__dirname, '../templates/views')                  // to access hbs it is neccessary to put hbs files in a folder name views.....if u want to name diff name to access file use this line (i didnt change the name )....views folder must be te root folder
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebar engine and  view location
app.set('view engine', 'hbs')                                     //hbs is the handlebar that is used to render dynamic content and can easily use and reuse  ....app.use() is used to tell express which templating engine we install
app.set('views', viewPath)
hbs.registerPartials(partialsPath)                                     // setup views folder location


// setup static directory to work

app.use(express.static(path.join(__dirname, '../public')))         //  its a way to customize server...tu serve up the folder ....accessing index.html file from public folder and run it on server...............//important->>the express.static() middleware is for. When a request comes in, it checks the public folder first to see if what we're requesting is in there. If it is, then Express serves it for us.(used in css styling -> href)         

// // app.get('',(req,res)=>{                  //here the empty string describes the home page or the route of our page  
// //     // res.send("Hello Express");
// //     res.send("<h1>Today's Weather</h1>")
// // }) 

app.get('', (req, res) => {                      // to run views use nodemon /src/app.js ...dont be inside src folder directly
    res.render('index', {                    // render allows us to render our views..here index is the hbs file in views folder(first param) , second param is general object that we can use in hbs file
        title: "Weather",
        name: "Kshitiz Agarwal"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Kshitiz Agarwal',
        title: "About me"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Need help ?",
        name: "Kshitiz"
    })
})




app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: "Provide some address to get the location"
        })
    }

    geoCode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                Error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    Error: error
                })
            }

            res.send({
                Address: req.query.address,
                ForecastData: forecastData,
                Location: data.location
            }) 
        })

    })

})




app.get('/products', (req, res) => {                      //remember -> for one req there is only one response
    if (!req.query.search) {                               // in the search bar of the browser ?search=games
        return res.send({
            error: 'You must provide a search term'
        })
    }

    // req.query stores the json query string
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404Error', {
        errorMessage: "Help article not Found",
        title: "404",
        name: 'Kshitiz'
    })
})

app.get('*', (req, res) => {                   // if no routes find , display an error msg
    res.render('404Error', {
        errorMessage: "Page not Found",
        title: "404",
        name: 'Kshitiz'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {       //this starts up a server and has it listen on a specific port
    console.log('Server is up on port ' + port)
})