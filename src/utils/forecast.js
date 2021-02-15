const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=a6baaa0a3cbe4535a87103403212901&q=' + lat + ',' + long + '&days=1'

    request({ url, json: true}, (err,{body}) => {
        if(err){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }
        else{
            callback(undefined,"Most of the day is " + body.current.condition.text + ". It is currently " + body.current.temp_c + " degrees out. There is " + body.forecast.forecastday[0].day.daily_chance_of_rain + " chance of rain")
        }
    })
}

module.exports = forecast