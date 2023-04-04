 const Habit=require('../models/habit');
 module.exports.load= function(req,res){
    // Habit.find({},function(err,habits){
    //     if(err){
    //         console.log("Err in fetching data from database",err);
    //         return;
    //     }
    //     return res.render('home',{
    //         habit_list: habits,
    //         title: "Habit Tracker App"
    //     })
    // })
    Habit.find({}).then(function(habits){
        return res.render('home',{ habit_list: habits,
                 title:"Habit Tracker App"
                });
    })
//  let habits=Habit.find({});
//  if(habits){
//     return res.render('home',{ habit_list: habits,
//      title:"Habit Tracker App"
//     });
//  } else {
//      console.log("Err in fetching data from database",err);
//      return;
//  }
 
 };

 module.exports.add=function(req,res){
     req.body.record_tracker={};
     req.body.user="AnyUser";
     let newhabit= Habit.create(req.body);
     if(newhabit){
        return res.redirect('back');
     } else {
        console.log("Eror in creating new habit",err);
        return;
     }
 }



 module.exports.viewhabit=async function(req,res){
    let id=req.query.id;
const habit =await Habit.findById(id).exec();
if(habit){
   return res.render('habit', {
      "habit":habit,
      title:"Indivisual Habit details"
   })
}
console.log("Eror in finding habit in database");
return ;

 }


 module.exports.deletehabit= async function(req,res){
           let id=req.query.id;
           const habit= await Habit.findByIdAndDelete(id).exec();
           if(habit){
            return res.redirect('back');
           }
           console.log("Eror in deleteing Habit");
           return res.redirect('back');
 }

 module.exports.fetchhabit =async function (request, response) {
   let id = request.query.id;
//    Habit.findById(id, function (err, habit) {
//        if (err) {
//            console.log("error in finding habit");
//            return;
//        }
//        else {
//            response.setHeader('Content-Type', 'application/json');
//            response.end(JSON.stringify(habit));
//        }
//    })
const habit= await Habit.findById(id).exec();
 if(habit){
    response.setHeader('Content-Type', 'application/json');
     response.end(JSON.stringify(habit));
 } else {
    console.log("eror in finding habit");
    return;
 }
}

 
   module.exports.updateDates = function (request, response) {
      let id = request.query.id;
      let date = request.query.date;
      let value = request.query.value;
      console.log(date, value, id);
  
      //  Then add/update the date in map then finally update map
      Habit.findById(id, function (err, habit) {
          if (err) {
              console.log("Error in updating habit!!!!");
              return response.end('{ "status":"failed"}');
          }
          else {
              const r_t = habit.record_tracker;
              if (date in r_t) {
               r_t[date] = value;
            }
            else {
                r_t.set(date, value);
            }
            console.log(r_t);
            Habit.updateOne({ "_id": id }, { $set: { record_tracker: r_t } }, function (err) {
                if (err) {
                  console.log("Error in updating habit!!!!");
                  return response.end('{ "status":"failed"}');
              }
              else {
                  // console.log("Updated!");
                  return response.end('{ "status":"success"}');
              }
          });
      }
  });
 }