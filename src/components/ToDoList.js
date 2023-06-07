import React from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const ToDoList = ({ todos, onDelete, enableEdit, onComplete }) => {
  return (
    <div className="divide-y divide-gray-200 m-auto shadow-lg bg-white rounded-lg mb-10">
      <div className="flex bg-blue-500 text-white p-2">
        <div className="w-1/4 md:w-1/6">Title</div>
        <div className="w-1/2 md:w-3/6">Description</div>
        <div className="hidden md:block md:w-1/6">Created</div>
        <div className="hidden md:block md:w-1/6">Last Updated</div>
        <div className="w-1/4 md:w-1/6 text-right">Actions</div>
      </div>
      {todos.map((todo) => (
        <div className="flex text-gray-700 p-2  bg-gray-100" key={todo.id}>
          <div className="w-1/4 md:w-1/6 flex items-center ">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onComplete(todo.id)}
              className="form-checkbox md:ml-2  h-5 w-5 text-blue-500 rounded-full"
            />
            <div className="md:ml-10">{todo.title}</div>
          </div>
          <div className="w-1/2 md:w-3/6">{todo.description}</div>
          <div className="hidden md:block md:w-1/6">
            {new Date(todo.created).toLocaleDateString()}{" "}
            {new Date(todo.created).toLocaleTimeString()}
          </div>
          <div className="hidden md:block md:w-1/6">
            {new Date(todo.lastUpdated).toLocaleDateString()}{" "}
            {new Date(todo.lastUpdated).toLocaleTimeString()}
          </div>
          <div className="w-1/4 md:w-1/6 text-right">
            <button onClick={() => enableEdit(todo)} className="p-1">
              <FaRegEdit className="text-blue-500 text-2xl mr-1" />
            </button>
            <button onClick={() => onDelete(todo.id)} className="p-1">
              <FaRegTrashAlt className="text-red-500 text-2xl mr-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
