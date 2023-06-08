import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateToDoModal = ({ fetchTodos, todoToUpdate, setTodoToUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (todoToUpdate) {
      setTitle(todoToUpdate.title);
      setDescription(todoToUpdate.description);
    }
  }, [todoToUpdate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedToDo = {
      id: todoToUpdate.id,
      title,
      description,
      completed: todoToUpdate.completed,
      created: todoToUpdate.created,
      lastUpdated: new Date().toISOString(),
    };

    try {
      await axios.put(
        `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${updatedToDo.id}`,
        updatedToDo,
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
      setTodoToUpdate(null); // Close the modal after a successful update
      setError(null); // If the request is successful, clear any previous error
    } catch (error) {
      // If the request fails, save the error message to display it
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  if (!todoToUpdate) {
    return null; // If there is no todoToUpdate, don't render anything
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:p-6 p-2 bg-white rounded-md md:w-[30%] md:h-[35%]"
      >
        <label htmlFor="title" className="mt-2 text-lg font-bold text-gray-600">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border-2 border-gray-200 rounded-md"
          required
        />
        <label htmlFor="title" className="mt-2 text-lg font-bold text-gray-600">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" p-2 border-2 border-gray-200 rounded-md"
          required
        />

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className=" p-2 bg-blue-500 text-white rounded-md "
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => setTodoToUpdate(null)} // Close the modal when the close button is clicked
            className=" p-2 bg-red-500 text-white rounded-md "
          >
            Close
          </button>
        </div>
        {/* Display an error message if there is one */}
        {error && <div>Error: {error}</div>}
      </form>
    </div>
  );
};

export default UpdateToDoModal;
