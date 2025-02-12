import { useEffect, useState } from "react";
import AddTask from "./Todo/AddTask";
import ShowTask from "./Todo/ShowTask";

function App() {
  const [task, setTask] = useState("");
  const [showTask, setShowTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load stored tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    setShowTask(storedTasks);
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(showTask));
  }, [showTask]);

  // Add Task
  const handleAddTask = (value) => {
    if (!value.trim()) return; // Prevent adding empty tasks
    setShowTask((prev) => [...prev, { name: value }]);
    setTask("");
  };

  // Handle Input Change
  const handleChange = (value) => {
    setTask(value);
  };

  // Delete Task
  const handleDelete = (index) => {
    const newTasks = showTask.filter((_, key) => key !== index);
    setShowTask(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
  };

  // Edit Task - Open Input
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(showTask[index].name);
  };

  // Save Edited Task
  const handleUpdateTask = () => {
    if (!editValue.trim()) return;
    const updatedTasks = showTask.map((task, key) =>
      key === editIndex ? { name: editValue } : task
    );
    setShowTask(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="w-full m-auto max-w-[600px]">
      <h1 className="text-3xl">To-Do List</h1>
      <div className="flex justify-center flex-col gap-9 w-full m-auto">
        <AddTask task={task} handleAddTask={handleAddTask} handleChange={handleChange} />
        <ShowTask
          setShowTask={setShowTask}
          data={showTask}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          editIndex={editIndex}
          editValue={editValue}
          setEditValue={setEditValue}
          handleUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  );
}

export default App;
