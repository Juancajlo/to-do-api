const models = require("../models");
const Task = models.Task;

const getTasks = async (req, res) => {
    const id = req.params.id;
    await Task.findAll({
        where: { user_id: id }
    })
    .then((tasks) => {
        res.status(200).json({
            tasks,
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: {
                error,
                message: "Internal server error getting tasks",
            },
        });
    });
};

const createTask = async (req, res) => {
    const { user_id, name, description, limitDatetime, completed } = req.body;
  
    await Task.create({
        user_id,
        name,
        description,
        limitDatetime,
        completed,
    })
    .then((task) => {
        res.status(200).json({
            task,
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: {
                error,
                message: "Internal server error creating a task",
            },
        });
    });    
};

const updateTask = async (req, res) => {
  const id = req.params.id;

  const { name, description, limitDatetime, completed } = req.body;

  const taskFound = await Task.findByPk(id)
    
  .then((task) => {
    if (task == null) {
        return res.status(400).json({
            msg: "Task not found",
        });
    }
    return task;  
    })
    .catch((error) => {
        res.status(500).json({
            error: {
                error,
                message: "Internal server error updating a task",
            },
        });    
    });

    if (name !== undefined) {
        taskFound.name = name;  
    }

    if (description !== undefined) {
        taskFound.description = description;  
    }

    if (limitDatetime !== undefined) {
        taskFound.limitDatetime = limitDatetime;  
    }

    if (completed !== undefined) {
        taskFound.completed = completed;  
    }
  
    const taskSaved = await taskFound.save();

    res.status(204).json({
        taskSaved,
    });
};

const deleteTask = async (req, res) => {  
    const id = req.params.id;
  
    const task = await Task.findByPk(id)
    .then((task) => {
        if (task == null) {
            return res.status(400).json({
                msg: "Task not found",
            });
        }
        return menu;
    })
    .catch((error) => {
        res.status(500).json({
            error: {
                error,
                message: `Internal server error getting task with id ${id}`,
            },
        });
    });

    await task.destroy()
    .then(() => {
        res.status(204).json({
            message: `Task with id ${id} deleted successfully`,
        });
    })
    .catch((error) => {
        res.status(500).json({
            error: {
                error,
                message: `Internal server error deleting task with id ${id}`,
            },
        });
    });  
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
