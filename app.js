var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var weatherInfo = require('./js/weatherInfo');

app.set('view engine','ejs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/',(req,res)=>{
	res.render('index')
})
app.post('/weather',weatherInfo)

app.listen(process.env.PORT || 4000)