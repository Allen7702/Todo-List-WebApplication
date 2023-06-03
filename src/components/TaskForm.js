import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      // Create a new task object
      const newTask = {
        id: `todo-${uuidv4()}`, // Generate a unique ID for the new task
        title,
        description,
        completed,
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
  
      // Add the new task
      addTask(newTask);
  
      // Clear the form fields
      setTitle("");
      setDescription("");
      setCompleted(false);
    };
  
    return (
      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Completed:
          <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} />
        </label>
        <button type="submit">Add Task</button>
      </form>
    );
  }
  
  export default TaskForm;

