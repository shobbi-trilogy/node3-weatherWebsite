const request = require('request');


const forecast = ( latitude, longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/228ab7468207b085bbc1354e7366fe33/' +
    latitude+','+longitude;

    request({url, json: true},(error, {body})=>{
            if(error){
                //console.log('unable to REACH the weather site.');
                callback('unable to REACH the weather site.');
            }else {
                if(body.error){
                    // console.log('unable to FIND location using provided cooerdinates:'+ 
                    // longitude +' & '+ latitude);
                    callback('unable to FIND location using provided cooerdinates:'+ 
                    longitude +' & '+ latitude);
                
                }else {
                    callback(undefined,body.daily.data[0].summary+' . It is currently '+ 
                    body.currently.temperature + ' degrees out.'+
                    'Hi & Low Temps: '+
                    body.daily.data[0].temperatureMax+ ' & '+ body.daily.data[0].temperatureMin);
                }
            }
    })

}

module.exports=forecast;