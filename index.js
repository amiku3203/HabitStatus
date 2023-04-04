
const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const MongoStore=require('connect-mongo');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const BodyParser=require('body-parser');
 const db=require('./config/mongoose');

 app.use(BodyParser.json());
 app.use(BodyParser.urlencoded({extended:true}));
//  app.use(cookieParser())

app.use(express.static('./assests'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the 

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require('./routes'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
   name:'CodeWithAmit',
    //ToDo change the secret before deployment in produnction mode
   secret: 'blasomething',
   saveUninitialized:false,
   resave:false,
   cookie: {
    maxAge:(100*60*100)
   },
   store: MongoStore.create({
      mongoUrl:"mongodb://127.0.0.1/habit_tracker_devleopment_mode",
      autoRemove:'disabled'

   },function(err){
    if(err){
      console.log('err');
    }
   })
     
 }));
app.listen(port,function(err){
   if(err){
      console.log("Eror in connecting to server",err);
   }
   console.log(`Ya finally we connected to express server on port : ${port}`);
});


