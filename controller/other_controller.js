const db = require('../modules/add_task_database');
exports.addtask = async (req, res) => {
  const { name } = req.body;
  const { task } = req.body;
  const { description } = req.body;
  const { status } = req.body;
  const { duration } = req.body;
  const { notification } = req.body;
  const { rannumber } = req.body;
  const { comments } = req.body;
  try {
    const d = { name, task, description, status, duration, notification, rannumber, comments }
    var k = new db(d).save();
    res.status(200).json(req.body);
  }
  catch (error) {
    console.log("Error in adding a new patient", error)
  }
}
exports.gettask = (req, res) => {
  db.find({})
    .then(docs => {
      console.log(docs)
      res.json(docs)
    })
    .catch(err => console.log("Error in fetching the users", err))
}
exports.deletetask = async (req, res) => {

  try {
    const TaskId = req.params.id;
    var g = await db.findByIdAndDelete(TaskId);
    res.send("Deleted successfully");
  }
  catch (error) {
    console.log("Error in deleting the tasks", error);
  }
}
exports.updatetask = async (req, res) => {
  try {
    const TasksId = req.params.id;
    console.log(TasksId);
    var g = await db.findByIdAndUpdate(TasksId, req.body);
    res.status(200).json(g);
    res.send("Updated successfully");
  }
  catch (error) {
    console.log("Error in updatingg the tasks", error);
  }
}