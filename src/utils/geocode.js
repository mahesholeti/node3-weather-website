const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib2xldGltYWhlc2gxMjMiLCJhIjoiY2s3YnFyYTEzMGVreDNlbWd5ZGUxd3ljMSJ9.vghspgDB7ZNVto_9q1AghA'

    request({ url, json: true}, (err,{body}) => {
        if(err){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                loc: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode