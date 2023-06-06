import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import UpdateToDoModal from "./components/UpdateToDoModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoToUpdate, setTodoToUpdate] = useState(null); // New state for storing the to-do item to update
  const [error, setError] = useState(null); // state for storing any error message
  const [isModalOpen, setIsModalOpen] = useState(false);

  const enableEdit = (todo) => {
    setTodoToUpdate(todo);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa?fields=.",
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );

      if (response.data.entries) {
        setTodos(response.data.entries.map((entry) => entry.value));
      }
      toast.success("ToDo Added Successfully");
    } catch (error) {
      // If the request fails, save the error message to display it
      setError(error.response ? error.response.data.message : error.message);
      toast.error("Failed to add ToDo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${id}`,
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );
      setTodos(todos.filter((todo) => todo.id !== id));
      toast.success("ToDo Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast.error("Failed to delete ToDo");
    }
  };

  // const enableEdit = (todo) => {
  //   setTodoToUpdate(todo);
  // };

  const updateTodo = (todoId, updatedTitle, updatedDescription) => {
    // The updatedTodo object now doesn't include the `created` field
    const updatedTodo = {
      id: todoId,
      title: updatedTitle,
      description: updatedDescription,
      completed: false,
      // `lastUpdated` is now set to the current date and time
      lastUpdated: new Date().toISOString(),
    };

    fetch(
      `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${todoId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa("admin:district")}`,
        },
        body: JSON.stringify(updatedTodo),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("ToDo Updated Successfully");
          toast.success("ToDo Updated Successfully");
        } else {
          throw new Error("Error updating ToDo");
        }
      })

      .catch((error) => console.log(error));
  };

  const completeTodo = async (todoId) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === todoId);
      if (!todoToUpdate) throw new Error("Todo not found");

      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };

      await axios.put(
        `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${todoId}`,
        updatedTodo,
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );

      fetchTodos(); // Refreshs the todos to display the updated completion status
    } catch (error) {
      console.error("Failed to update todo completion status:", error);
    }
  };

  // Define the function for deleting all to-dos
  const deleteAllTodos = async () => {
    try {
      // Fetch all keys in the namespace
      const response = await axios.get(
        "https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa",
        {
          auth: {
            username: "admin",
            password: "district",
          },
        }
      );

      // For each key, send a DELETE request
      for (const key of response.data) {
        await axios.delete(
          `https://dev.hisptz.com/dhis2/api/dataStore/allen_mgeyekwa/${key}`,
          {
            auth: {
              username: "admin",
              password: "district",
            },
          }
        );
      }

      // Clear the local state
      setTodos([]);
      console.log("All todos deleted successfully");
      toast.success("All ToDos Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete todos:", error);
      toast.error("Failed to delete all ToDos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App p-10 p-10 bg-gray-100 h-screen">
      <ToastContainer />
      <h1 className="text-center text-4xl text-blue-800">ToDo Application</h1>
      <div className="container mx-auto  bg-gray-300 shadow-md rounded-md p-5">
        <ToDoForm fetchTodos={fetchTodos} />
        <button
          onClick={deleteAllTodos}
          className="self-end p-2 bg-red-500 text-white rounded-md mt-4 hover:bg-red-600"
        >
          Delete All Tasks
        </button>
        {/* Display the fetched to-do items */}
        <ToDoList
          todos={todos}
          onDelete={deleteTodo}
          enableEdit={enableEdit}
          onComplete={completeTodo}
          show={isModalOpen}
          onClose={closeModal}
        />
        <UpdateToDoModal
          fetchTodos={fetchTodos}
          todoToUpdate={todoToUpdate}
          setTodoToUpdate={setTodoToUpdate}
        />
        {/* Display an error message if there is one */}
        {error && (
          <div className="mt-4 bg-red-500 text-white p-3 rounded-md">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
