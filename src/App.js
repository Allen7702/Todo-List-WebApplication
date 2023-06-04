import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null); // state for storing any error message

  useEffect(() => {
    const fetchToDos = async () => {
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

    fetchToDos();
  }, []);

  const addToDo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1>To-Do Application</h1>
      <ToDoForm addToDo={addToDo} />
      {/* Display the fetched to-do items */}
      <ToDoList todos={todos} />
      {/* Display an error message if there is one */}
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;
