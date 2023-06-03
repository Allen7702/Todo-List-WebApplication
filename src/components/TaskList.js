import React, { useState} from "react";
//import Task from "./Task";

function TaskItem({ task, updateTask, deleteTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed);
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      // Update the task
      updateTask(task.id, { ...task, title, description, completed, lastUpdated: new Date().toISOString() });
  
      // Exit edit mode
      setIsEditing(false);
    };
  
    return (
      isEditing ? (
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-row justify-between">
            Title:
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="border p-2 rounded" />
          </label>
          <label className="flex flex-row justify-between">
            Description:
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 rounded" />
          </label>
          <label className="flex flex-row justify-between items-center">
            Completed:
            <input type="checkbox" checked={completed} onChange={e => setCompleted(e.target.checked)} className="ml-4" />
          </label>
          <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded">Save Changes</button>
          <button type="button" onClick={() => setIsEditing(false)} className="py-2 px-4 bg-red-500 text-white rounded">Cancel</button>
        </form>
      ) : (
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-xl">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-green-500">{task.completed ? "Completed" : "Not completed"}</p>
          <button onClick={() => setIsEditing(true)} className="py-2 px-4 bg-yellow-500 text-white rounded">Edit</button>
          <button onClick={() => deleteTask(task.id)} className="py-2 px-4 bg-red-500 text-white rounded">Delete</button>
        </div>
      )
    );
  }
  
  function TaskList({ tasks, updateTask, deleteTask }) {
    return (
      <ul className="divide-y divide-gray-200">
        {tasks.map(task => (
          <li key={task.id} className="py-4">
            <TaskItem task={task} updateTask={updateTask} deleteTask={deleteTask} />
          </li>
        ))}
      </ul>
    );
  }
  
  export default TaskList;
