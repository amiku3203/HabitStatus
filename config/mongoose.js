const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/habit_tracker_devleopment_mode');
const db=mongoose.connection;
db.on('eror',console.error.bind(console,"Eror connecting to mongodb"));
db.once('open', function(){
    console.log("Now i am on one step ahed means Succesfully connected to database :: mongodb");
})
module.exports=db;
