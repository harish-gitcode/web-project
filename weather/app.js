const express = require('express');
const https = require('https');
const bparser=require('body-parser');

const app = express();
app.use(bparser.urlencoded({extended:true}));
var query="";
const unit="metric";
app.get('/', function (req, res) {

    

    //another way of defining the function 

    // https.get(url,(response) => {
    //     console.log(response);
    // })
        res.sendFile(__dirname+"/index.html");


    
    // https.get(url, function (response) {
    //     console.log(response.statusCode);


    //     response.on('data', (data) => {
    //         const d = JSON.parse(data);

    //         //Another method JSON.stringify is used to use minimum space 
    //         const temp = d.main.temp;
    //         const des = d.weather[0].description;

    //         const icon = d.weather[0].icon;
    //         console.log(icon);
    //         const img = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    //         console.log(des);
    //         // res.send("<h1>Temperature in Delhi is : "+temp+"degree celcius</h1>\nWeather description: "+des);
    //         //instead of doing this we can also use 
    //         res.write("<p>Weather description : " + des + "</p>");
    //         res.write("<h1>Temp in the Delhi is :" + temp + "</h1>");
    //         res.write("<img src=" + img + ">");
    //         res.send();

    //         console.log(temp);
    //     })
    // });



});
app.post('/',function(req,res){
    query=req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=7d247239209e0a7e090c747257945723&units="+unit;

    https.get(url,function(response){

        response.on('data',function(data){
            
            const weatherData=JSON.parse(data);
            
           const temp=weatherData.main.temp;
           const icon=weatherData.weather[0].icon;
           const des=weatherData.weather[0].description;

           const img= "http://openweathermap.org/img/wn/" + icon + "@2x.png";

        
         res.write("<h1>Temp in " +query+" is :" + temp + "</h1>");
         res.write("<h3>Weather description : " + des + "</h3>");
         res.write("<img src=" + img + ">");
         res.send();
        })



    });

    
   
    
});

app.listen(3000, function () {
    console.log("server running at port: 3000")
})