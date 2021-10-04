const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));//to customize server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

/*app.get('', (req, res) => {
    //res.send('Hello express!')
    res.send('<h1>Weather</h1>')
});*/

/*app.get('/help', (req, res) => {
    //res.send('Help page')
    //res.send({
    //   name: 'Andrew',
    //   age: 27 })
    res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }]); //will take some time to load so u can startup cmd again
});//localhost:3000/help to display txt

app.get('/about', (req, res) => {
    //res.send('About')
    res.send('<h1>About</h1>')
});*/

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    //={}default object so if object is not provided it will print error message
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    //res.send('Your weather')
    //res.send({//object
    //    forecast: 'It is snowing',
    //    location: 'Philadelphia',
    //    address: req.query.address })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
});

app.get('*', (req, res) => {// this * is wildcard character
    //res.send('My 404 page')
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})//wont stop need to shut down; while running can print on google chrome at localhost:3000>Hello express!

//Goal: Setup two new routes
//1.Setup an about route and render a page title
//2.Setup a weather route and render a page title
//3.Test your work by visiting both in the browser

////Goal: Update routes
//1.Setup about route to render a title with HTML
//2.Setup a weather route to send back JSON
//  -Object with forecast and location strings
//3.Test your work by visiting both in the browser

//Goal: Create 2 more HTML files
//1.Create a html page for about with "About" title
//2.Create a html page for help with "Help" title
//3.Remove the old route handlers for both
//4.Visit both in the browser to test your work

//Goal: Create a template for help page
//1.Setup a help template to render a help message to the screen
//2.Setup the help route and render the template with an example message
//3.Visit the route in the browser and see your help message print

//Goal: Create a partial for the footer
//1.Setup the template for the footer partial "Created by Some Name"
//2.Render the partial at the bottom of all three pages
//3.Test your work by visiting all three pages

//Goal: Create and render a 404 page with handlebars
//1.Setup the tempalte to render the header and footer
//2.Setup the template to render an error message in a paragraph
//3.Render the template for both 404 routes
//  -Page not found.
//  -Help article not found.
//4.Test your work. Visit /what and /help/units

//Goal: Update weather endpoint to accept address
//1.No address? Send back an error message
//2.Address? Send back the static JSON
//  -Add address property onto JSON which returns the provided address
//3.Test /weather and /weather?address=philadelphia

//Goal: Wire up /weather
//1.Require geocode/forecast into app.js
//2.Use the address to geocode
//3.Use the coordinates to get forecast
//4.Send back the real forecast and location