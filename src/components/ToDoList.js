import React from "react";

const ToDoList = ({ todos, onDelete, enableEdit, onComplete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 m-auto">
      <thead className="bg-gray-50">
        <tr>
          <th className="  p-2">Status</th>
          <th className=" p-2">Title</th>
          <th className=" p-2">Description</th>
          <th className=" p-2">Created</th>
          <th className=" p-2">Completed</th>
          <th className=" p-2">Last Updated</th>
          <th className=" p-2">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td className="pl-14">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onComplete(todo.id)}
              />
            </td>
            <td className="pl-14 text-sm text-gray-500">{todo.title}</td>
            <td className="pl-14 text-sm text-gray-500">{todo.description}</td>
            <td className="pl-14 text-sm text-gray-500">
              {new Date(todo.created).toLocaleDateString()}{" "}
              {new Date(todo.created).toLocaleTimeString()}
            </td>
            <td className="pl-14 text-sm text-gray-500">
              {todo.completed ? "Yes" : "No"}
            </td>
            <td className=" lr146 text-sm text-gray-500">
              {new Date(todo.lastUpdated).toLocaleDateString()}{" "}
              {new Date(todo.lastUpdated).toLocaleTimeString()}
            </td>
            <td className="pl-14 text-right text-sm font-medium">
              <button
                onClick={() => enableEdit(todo)}
                className="p-1 bg-blue-500 text-white rounded-md ml-2"
              >
                Update
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 bg-blue-500 text-white rounded-md ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToDoList;
