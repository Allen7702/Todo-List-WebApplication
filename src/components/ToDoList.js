import React from "react";

const ToDoList = ({ todos, onDelete, enableEdit }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Created
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Completed
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Last Updated
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {todo.title}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {todo.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(todo.created).toLocaleDateString()}{" "}
              {new Date(todo.created).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {todo.completed ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(todo.lastUpdated).toLocaleDateString()}{" "}
              {new Date(todo.lastUpdated).toLocaleTimeString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
