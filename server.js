const express =require('express');
const hbs=require('hbs');
const fs=require('fs');



const port=process.env.port || 3000;


var app=express();


app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
// app.use((req,res,next)=>{

//     res.render('repair.hbs');

// })

app.use( (req,res,next)=>{

    var now= new Date().toString();
    log=`${now}  ${req.method}  ${req.url} \n`;
    console.log(log);
    fs.appendFile('requests.log',log+"\n",(err)=>{

        if(err){
            console.log(console.err);
            
        }

    });

    next();

});



hbs.registerHelper('getCurrentYear',()=>{

    return new Date().getFullYear()+" hejri miladi"

});

hbs.registerHelper("ScreamIt",(text)=>{
    return text.toUpperCase();
});

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{

    res.render("home.hbs",{

       
        pageTitle:"Home Page1",
        alertMessage:"Wellcome to website!"
    })
  
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About1",
      
    });
})

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});