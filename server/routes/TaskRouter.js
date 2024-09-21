
const { getAllTasks, addTask, deleteTask, updateTask } = require('../controllers/TaskController');


const router = require('express').Router();

router.post('/alltasks',getAllTasks);
router.post('/addtask',addTask);
router.post('/deletetask',deleteTask);
router.post('/updateTask',updateTask);



module.exports = router;