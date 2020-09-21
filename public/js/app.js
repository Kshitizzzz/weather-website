console.log("Client side javascript file loaded");

// fetch('http://localhost:3000/weather?address=jaipur').then((response)=>{
//     response.json().then((data)=>{
//         if(data.Error){
//             console.log(data.Error)
//         }

//         else{
//             console.log(data.Location);              // in src -> app.js 
//             console.log(data.ForecastData);
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')              // these are the actual content that we want to display on our webpage ..... present in index.hbs
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent="Hello Javascript"


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;



    messageOne.textContent = 'LOADING...'      // print while data is loaded
    messageTwo.textContent = ''               // clear the prev value if any

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                messageOne.textContent = data.Error
                // console.log(data.Error)
            }

            else {
                messageOne.textContent = data.Location
                messageTwo.textContent = data.ForecastData

                // console.log(data.Location);              // in src -> app.js (Location and Error...where we imported  the geocode funct)
                // console.log(data.ForecastData);
            }
        })
    })
})
