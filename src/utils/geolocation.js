const request = require('request');

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+
    encodeURIComponent(location) +
    '.json?access_token=pk.eyJ1Ijoic2hvYmJpIiwiYSI6ImNrN2h5dmg1MDBlaGkza3F2aGQzbDAzMHEifQ.2ZnN-3NgpbSc-R6_aYT_5A&limit=1';
    
    request({url,json:true},(error,{body})=>{
        // console.log(response.body)
        if(error){

            //console.log('unable to reach the geoLocation site.')
            callback('unable to reach the geoLocation site.');
        }else {
            if(body.features.length===0){
                //console.log('no matching result for:' + response.body.query);
                callback('no matching result for:' + body.query);
            }else {
                console.log('the latitude is '+body.features[0].center[1]+' the longitudeis '+
                    body.features[0].center[0]);
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                });
            }
            
        }
    })
}

module.exports = geocode;