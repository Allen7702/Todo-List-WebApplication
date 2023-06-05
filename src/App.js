import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoToUpdate, setTodoToUpdate] = useState(null); // New state for storing the to-do item to update
  const [error, setError] = useState(null); // state for storing any error message

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

      setError(null); // If the request is successful, clear any previous error
    } catch (error) {
      // If the request fails, save the error message to display it
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const addToDo = (todo) => {
    setTodos([...todos, todo]);
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
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // const updateTodo = (todo) => {
  //   setTodoToUpdate(todo);
  // };

  const enableEdit = (todo) => {
    setTodoToUpdate(todo);
  };

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
        } else {
          throw new Error("Error updating ToDo");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App p-10 ">
      <h1 className="text-center text-4xl">ToDo Application</h1>
      <ToDoForm
        fetchTodos={fetchTodos}
        updateTodo={updateTodo}
        todoToUpdate={todoToUpdate}
      />
      {/* Display the fetched to-do items */}
      <ToDoList todos={todos} onDelete={deleteTodo} enableEdit={enableEdit} />
      {/* Display an error message if there is one */}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;
