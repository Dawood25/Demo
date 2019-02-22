const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname +'/public'));
const port=process.env.PORT || 3000;
//middleware to use logger
app.use((req, res, next)=>{
    
    var now=new Date().toString();
    var log=`${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('unable to appedn to server.log file.')
        }
    });
    next();
});
//middleware to show site is under maintainance page

// app.use((req, res, next)=>{
// res.render('maintainance.hbs');
// });



hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/',(req, res)=>{
    //res.send('<h1>Hello Express!!!</h2>');
    // res.send({
    //     name:'Andrew',
    //     likes:[
    //         "Biking",
    //         "Gaming"
    //     ]
    // })
    res.render('home.hbs',{
        pageTitle:'Home',
        remark:'Welcome to the home Page'
    })
});
app.get('/projects',(req,res)=>{
res.render('projects.hbs',{
    pageTitle:'Portfolio Page'
});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
    pageTitle:'About Page'
});
});
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:"Error didnt find the page"
    });
})
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});