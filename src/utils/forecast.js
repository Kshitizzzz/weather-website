const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=baaffec322574a8329e8f224d741718a&query=' + latitude + ',' + longitude + '&units=f'
  
    request({url:url , json:true },(error,response)=>{          //request({url , json:true },(error,{body})  ----> es6 feature and remove response from below
        if(error){
            callback("Unable to connect to the weather app. Try again!",undefined)
        }
        else if(response.body.error){ 
            callback('Unable to find Loacation',undefined)
        }
        else{
            callback(undefined,response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + " degree fahrenheit and it feels like " + response.body.current.feelslike + " degree fahrenheit .")
        } 
    }) 
}

module.exports = forecast

