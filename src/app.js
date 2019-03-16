const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.port || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tyler Mok'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Tyler Mok'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpfulText: 'This isn\'t very helpful',
        title: 'Help',
        name: 'Tyler Mok'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    };
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        };
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            };
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    };
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article was not found.',
        name: 'Tyler Mok'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.',
        name: 'Tyler Mok'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
});