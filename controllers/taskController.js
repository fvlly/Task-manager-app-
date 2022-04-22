const Task = require("../models/tasks");

// post a task, post /newtask, public
const postTask = async (req, res) => {
  const { task, inProgress, completed } = req.body;
  const newTask = await new Task({
    description: task,
    inProgress,
    completed,
  });

  try {
    await newTask.save();
    res.status(201).json({
      description: newTask.description,
      inProgress: newTask.inProgress,
      completed: newTask.completed,
    });
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("Input the valid fields");
  }
};

// get tasks,/tasks, public

const getTasks = async (req, res) => {
  try {
    const foundTasks = await Task.find({});
    if (foundTasks) {
      res.status(200).send(foundTasks);
    }
  } catch (error) {
    res.status(404).send("database is down");
  }
};

// get a specific taks, /tasks/:id, private
const getTask = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
};

const editTask = async (req, res) => {
  const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
};

// delete specific task ,/tasks/:id, private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  postTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
};
