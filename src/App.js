import React, { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Loader from "./components/loader";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_ENDPOINT = `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa?fields=.`;

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT, {
        headers: {
          Authorization: `Basic ${btoa("admin:district")}`,
        },
      });

      if (response.ok) {
        console.log('Successfully connected to API');
        const data = await response.json();
        setTasks(data.entries);
      } else if (response.status === 404) {
        console.log('No tasks found');
        setTasks([]);
      } else {
        console.error('Failed to connect to API');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    const response = await fetch(`https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${task.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa("admin:district")}`,
      },
      body: JSON.stringify(task)
    });
    if (response.ok) {
      console.log(`Task added: ${task.id}`);
      fetchTasks();  // Update the task list after adding a new task
    }
    else {
      console.error(`Failed to add task: ${task.id}`);
    }
  };
  
  const updateTask = async (id, updatedTask) => {
    const response = await fetch(`https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa("admin:district")}`,
      },
      body: JSON.stringify(updatedTask)
    });
    if (response.ok) {
      console.log(`Task updated: ${id}`);
      fetchTasks();  // Update the task list after updating a task
    }
    else {
      console.error(`Failed to update task: ${id}`);
    }
  };
  
  const deleteTask = async (id) => {
    const response = await fetch(`https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Basic ${btoa("admin:district")}`,
      }
    });
    if (response.ok) {
      console.log(`Task deleted: ${id}`);
      fetchTasks();  // Update the task list after deleting a task
    }
    else {
      console.error(`Failed to delete task: ${id}`);
    }
  };

  return (
    <div className="App">
      <TaskForm addTask={addTask} />
      {loading ? <Loader /> : <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />}
    </div>
  );
};

export default App;
