const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app= express();

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine','hbs');
// app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next)
{
	var cur_date=new Date().toString();
	var log=cur_date+req.method+req.url;
	console.log(log);
	fs.appendFile('server.log',log + '\n');
      next();
});
// app.use(function (req, res, next){
// 	res.render('maint.hbs');

// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',function(){
    return new Date().getFullYear()
});


app.get('/home',function(req,res){
	res.render('homepage.hbs',{
		pagetitle:"Home Page",
		body:"hello text",
		// date:new Date().getFullYear()
	});

});




app.get('/',function(req,res){
	// res.send('hello express');
	res.send({
		name:'Amrata Rajput',
		liking:["singing",
		"painting"]
		
	});

});

// app.get('/testpage',function(req,res){
// 	res.send("This is about page");

// });

app.get('/error',function(req,res)
{ 
	res.send({
		error:"error is coming"
	});

});
app.listen(3000, function(){ console.log('server is start'); } );