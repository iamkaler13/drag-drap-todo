import React, { useState } from "react";

const ShowTask = ({ data, setShowTask, handleEdit, handleDelete, editIndex, editValue, setEditValue, handleUpdateTask }) => {

  const [draggedTask, setDraggedTask] = useState(null);
  if (!data || data.length === 0) return <p>No tasks available.</p>;

  // Handle drag start event
  const handleDragStart = (index) => {
    setDraggedTask(index);
  };

  // Handle drag over event (allows dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event (Reorder the task list)
  const handleDrop = (index) => {
    if (draggedTask === null) return;

    const newTasks = [...data];
    const draggedItem = newTasks[draggedTask];

    // Remove the dragged item
    newTasks.splice(draggedTask, 1);
    // Insert it at the new position
    newTasks.splice(index, 0, draggedItem);

    setShowTask(newTasks);
    localStorage.setItem("task", JSON.stringify(newTasks));
    setDraggedTask(null);
  };

  return (
    <div>
      <h1 className="text-2xl backdrop-blur-0 my-3">All Tasks</h1>
      <div className="flex flex-col gap-3">
        {data.map((ele, key) => (
          <div
            key={key}
            draggable
            onDragStart={() => handleDragStart(key)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(key)}
            className="flex justify-between items-center p-2 border bg-gray-100 rounded-md cursor-pointer"
          >
            {editIndex === key ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="text-black border pl-1 py-1"
              />
            ) : (
              <p>{ele.name}</p>
            )}
            <div className="flex gap-4">
              {editIndex === key ? (
                <button onClick={handleUpdateTask} className="text-white py-1 px-3 rounded-md bg-green-500">
                  Save
                </button>
              ) : (
                <button onClick={() => handleEdit(key)} className="text-white py-1 px-3 rounded-md bg-black">
                  Edit
                </button>
              )}
              <button onClick={() => handleDelete(key)} className="text-white py-1 px-3 rounded-md bg-red-500">
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTask;
