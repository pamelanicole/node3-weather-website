const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b2a079ad07aba1f1b269a7beea974aa4&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined) //only works for the MOST ridiculous inputs like $$$$
            //someone suggested adding another else if > } else if (!response.body.location.name) {callback('No data for that location.', undefined)}
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })
};

module.exports = forecast;

//Goal: Add new data to forecast
//1.Update the forecast string to include new data
//2.Commit your changes
//3.Push your changes to Github and deploy to Heroku
//4.Test your work in the live application!
