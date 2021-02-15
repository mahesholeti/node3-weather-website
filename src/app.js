const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Mahesh'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Mahesh'
    })
})

app.get('/help',(req,res) => {
    res.send('Welcome to Help Page')
})

// app.get('/about',(req,res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({ 
            error: 'You must provide a address'
        })
    }
    const address = req.query.address
    geocode(address,(err,{lat,long,loc} = {}) => {
        if(err) return res.send({err})
        forecast(lat,long,(err,forecastData) => {
            if(err) return res.send({err})
            res.send({
                location: loc,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*',(req,res) => {
    res.render('404')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})