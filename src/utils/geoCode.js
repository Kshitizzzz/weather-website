const request = require ('request')

const geoCode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3NoaXRpejg5OCIsImEiOiJja2YyY2kzdXkwaWU3MnNxZGwydTZqMmk2In0.VVdNZW99CTsE0DVHMJPFlQ&limit=1';
    
    request({url:url , json:true},(error,response)=>{                //request({url , json:true },(error,{body})  ----> es6 feature and remove response from below
        if(error){
            callback("Unable to connect to location services", undefined);      // in map box our content is in features and if we type incorrect location than our features array will be empty
        }
        else if(response.body.features.length === 0 ){
            callback("Unable to search for the given location" , undefined)
        }
        else{
            callback(undefined ,{
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            } )
        }
    })

}


module.exports = geoCode