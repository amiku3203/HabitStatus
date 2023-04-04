const mongoose=require('mongoose');
const habitschema=new mongoose.Schema({
           user:{
            type:String,
            required:true
           },
           habit_name:{
            type:String,
            required:true
           },
           record_tracker: {
            type:Map
           }
},{
    timestamps:true
});
const Habit=mongoose.model("Habit",habitschema);
module.exports=Habit;