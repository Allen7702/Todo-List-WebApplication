import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ToDoForm = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // New state for storing any error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const todo = {
      id: "todo-" + uuidv4(),
      title,
      description,
      completed: false,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    try {
      // if (todoToUpdate) {
      //   await axios.put(
      //     `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${todoToUpdate.id}`,
      //     todo,
      //     {
      //       auth: {
      //         username: "admin",
      //         password: "district",
      //       },
      //     }
      //   );
      //   updateTodo({
      //     ...todo,
      //     lastUpdated: new Date().toISOString(),
      //   });
      // } else {
      await axios.post(
        `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${todo.id}`,
        todo,
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );
      // }

      //addToDo(todo);

      setTitle("");
      setDescription("");
      fetchTodos();
      setError(null); // If the request is successful, clear any previous error
    } catch (error) {
      // If the request fails, save the error message to display it
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col my-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="my-2 p-2 border-2 border-gray-200 rounded-md"
        required
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="my-2 p-2 border-2 border-gray-200 rounded-md"
        required
      />

      <button
        type="submit"
        className="self-end p-2 bg-blue-500 text-white rounded-md mt-4"
      >
        Add Task
      </button>

      {/* Display an error message if there is one */}
      {error && <div>Error: {error}</div>}
    </form>
  );
};

export default ToDoForm;
