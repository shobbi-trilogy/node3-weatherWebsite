const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geolocation.js');
const forecast = require('./utils/forecast.js')


const app = express();
//app.com
///help
///about

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'))

//define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup the handlebars engine
//setup handlebars engine and views locations
app.set('views', viewsPath); 
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);


//setup static directory path
app.use(express.static(publicDirectoryPath))

//
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather APP',
        name: 'salah'
    }) //no extension
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Salah Hobbi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help is on the way',
        message:'Dont hold back.',
        name: 'Salah Hobbi'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'must provide address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        console.log('The weather at '+ location+'('+latitude+','+longitude+')');
        //geoCoords = data;
        //check the weather for found location
        forecast(latitude,longitude,(error,data)=>{
            if (error){
                return res.send({
                    error: error
                })
            }else{
                return res.send({
                    forecast: data,
                    location: location,
                    address: req.query.address
                })
            }
        });    
    })
    // res.send({
    //     forcast: 'Weather APP',
    //     location: 'salah',
    //     address: req.query.address
    // })
})
app.get('/products',(req,res)=>{
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error: 'must provide a value' 
        })
    }

    res.send({
        products: ['search is '+ req.query.search]
    })

})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message: 'Help article not found',
        name:'S. Hobbi'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message: 'My 404 page',
        name: 'S. Hobbi'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>hello express!</h1>')
// })
// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page!!!</h1')
// })

app.get('/weather',(req,res)=>{
    //res.send('<title>Weather Page!</title>')
    res.send({
        weather: 'clear and beautiful',
        location: 'wayne, nj, usa'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000.');
})