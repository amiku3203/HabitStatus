const habitController=require('../controllers/habit_controller');
const express=require('express');
const router=express.Router();

router.get('/',habitController.load);
// Router.use('/users',require('./user'))
router.post('/add-habit',habitController.add);
router.get('/view-habit',habitController.viewhabit);
router.get('/delete-habit',habitController.deletehabit);
router.get('/update-db-date',habitController.updateDates);
router.get('/find-habit',habitController.fetchhabit)
module.exports=router;