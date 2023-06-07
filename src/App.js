import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import UpdateToDoModal from "./components/UpdateToDoModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import logo from "./Assets/icon1.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoToUpdate, setTodoToUpdate] = useState(null); // New state for storing the to-do item to update
  const [error, setError] = useState(null); // state for storing any error message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

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
    <div className="App  md:p-10  min-h-screen w-full ">
      <ToastContainer />
      <div className="hidden md:block text-center text-7xl notosan font-bold mb-4 gradient-text">
        <img src={logo} alt="Logo" className="mx-auto my-4 w-32 h-28" />
      </div>
      <div className="md:container md:mx-auto  sm:shadow-md sm:rounded-lg md:p-5 p-2 sm:bg-[rgba(255,255,255,0.1)] sm:backdrop-blur-lg rounded-xl sm:border sm:border-gray-200 sm:border-opacity-20 sm:shadow-lg">
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="flex-grow  ">
            <h2 className="text-4xl font-semibold gradient-text mt-2">
              Welcome to the ToDo Application!
            </h2>
            <p className="text-xl">
              Organize your tasks efficiently and achieve more.
            </p>
            <img src={logo} alt="Logo" className="mx-auto my-4 w-20 h-20" />
          </div>
          <div className="flex-grow ">
            <ToDoForm fetchTodos={fetchTodos} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4">
          <h2 className="text-xl text-gray-100 font-semibold mb-2 sm:mb-0">
            Tasks : {todos.length}
          </h2>
          <div className="flex gap-2">
            <button
              className={`px-2 rounded ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } border border-blue-500 text-sm rounded-full h-7`}
              onClick={() => setFilter("all")}
            >
              All Tasks
            </button>
            <button
              className={`px-2 rounded ${
                filter === "completed"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } border border-blue-500 text-sm rounded-full h-7`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={`px-2 rounded ${
                filter === "uncompleted"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              } border border-blue-500 text-sm rounded-full h-7`}
              onClick={() => setFilter("uncompleted")}
            >
              Pending
            </button>
            <button
              onClick={deleteAllTodos}
              className="self-end px-2 border border-red-500 text-red-500 bg-white  hover:bg-red-500 hover:text-white rounded-full h-7"
            >
              Delete All
            </button>
          </div>
        </div>

        {/* Display the fetched to-do items */}
        <ToDoList
          todos={todos.filter((todo) => {
            if (filter === "all") return true;
            if (filter === "completed") return todo.completed;
            if (filter === "uncompleted") return !todo.completed;
          })}
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
