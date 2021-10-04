const request = require('request');

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFyaWFwY2FzaW5nYWwiLCJhIjoiY2t1YjNvbm4zMGtxdjJzcDQ0Mmo0MHZhZiJ9.ygKl39VXotbAwzgRGC88rA&fuzzyMatch=false&limit=1'
    //&limit=1'; // or just address cuz previously it can also read special characters like ?; &fuzzyMatch=false to stop the response to every query like 12what > without this 12what query wont error

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,//should be an array if not &limit=1
            })
        }
    })
};

module.exports = geocode;