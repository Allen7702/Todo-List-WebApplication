import React, { useState } from "react";

const Task = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedTask.title}
            onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
          />
          <input
            type="text"
            value={updatedTask.description}
            onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
          />
          <button type="submit">Update Task</button>
        </form>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </li>
  );
};

export default Task;
