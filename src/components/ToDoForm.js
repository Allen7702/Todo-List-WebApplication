import React, { useState } from "react";
import axios from "axios";

const ToDoForm = ({ addToDo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // New state for storing any error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const todo = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      created: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    try {
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

      addToDo(todo);

      setTitle("");
      setDescription("");
      setError(null); // If the request is successful, clear any previous error
    } catch (error) {
      // If the request fails, save the error message to display it
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <button type="submit">Add ToDo</button>

      {/* Display an error message if there is one */}
      {error && <div>Error: {error}</div>}
    </form>
  );
};

export default ToDoForm;
