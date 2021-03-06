const { Router } = require('express');

const router = Router();

const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');

router.get('/:id', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;