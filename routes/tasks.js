const { Router } = require('express');

const router = Router();

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');

router.get('/:id', getTasks);
router.get('/completed/:id', getTasksByCompleted);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;