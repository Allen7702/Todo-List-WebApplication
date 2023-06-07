import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { IoIosAdd } from "react-icons/io";

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
    <form onSubmit={handleSubmit} className="flex flex-col my-4 items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="my-2 p-2 bg-[rgba(255,255,255,0.7)] backdrop-blur-md rounded-md w-full md:w-4/5 mx-auto border border-gray-200 border-opacity-20 shadow-lg"
        required
      />

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="my-2 p-2 bg-[rgba(255,255,255,0.7)] backdrop-blur-md rounded-lg w-full md:w-4/5 mx-auto border border-gray-200 border-opacity-20 shadow-lg"
        required
      />

      <button
        type="submit"
        className="flex items-center justify-center p-2 font-bold text-lg text-gray-100 rounded-lg  mt-4 w-full md:w-4/5 backdrop-filter backdrop-blur-md bg-opacity-30 hover:bg-opacity-40 transition duration-200 ease-in-out bg-blue-500 shadow-xl hover:scale-105 hover:bg-blue-600"
      >
        <IoIosAdd className="mr-2 w-10 h-10" /> Add Task
      </button>

      {/* Display an error message if there is one */}
      {error && <div>Error: {error}</div>}
    </form>
  );
};

export default ToDoForm;
