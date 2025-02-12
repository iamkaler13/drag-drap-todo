import React from "react";

const AddTask = ({ handleChange, task, handleAddTask }) => {
  return (
    <div className="grid grid-cols-[80%,20%] items-center gap-4">
      <div className="w-full my-3">
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          className="text-black border pl-1 py-2 w-full"
          value={task}
          placeholder="Enter a task..."
        />
      </div>
      <div>
        <button
          onClick={() => handleAddTask(task)}
          className="text-white py-1 px-3 rounded-md bg-black"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
