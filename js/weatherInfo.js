let request = require('request');
var secret = require('../util/secret')

var weatherInfo = function(req,res){
	var city = req.body.city;
	let apiKey = secret.API_KEY;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
	request(url,(err,response,body)=>{
		if(err)
			res.render('error')
		else{
			var body = JSON.parse(body);
			if(body.cod === 200){
				var currentTemp = body.main.temp - 273.15; // converting to celsius
				var weatherType = body.weather[0].description;
				var maxTemp = body.main.temp_max - 273.15;// converting to celsius
				var minTemp = body.main.temp_min - 273.15;// converting to celsius
				var pressure = body.main.pressure;
				var humidity = body.main.humidity;
				var windSpeed = body.wind.speed;
				var visibility = body.visibility/1000;
				var weatherObject = {currentTemp: currentTemp,weatherType : weatherType,maxTemp:maxTemp,minTemp: minTemp, pressure : pressure, humidity:humidity,city: city,windSpeed:windSpeed,visibility:visibility}
				res.render('weatherInfo',{weatherObject : weatherObject})
			}else{
				res.render('error')
			}
		}
	})
}
module.exports = weatherInfo