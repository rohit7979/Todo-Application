import { useEffect, useState } from "react";
import { Navbar } from "./components/navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null); // New state to track editing

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (editMode) {
      // Save the edited todo instead of adding a new one
      const updatedTodos = todos.map((item) => 
        item.id === editTodoId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditMode(false);
      setEditTodoId(null); // Clear the editTodoId after saving changes
    } else {
      // Add a new todo
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let todoItem = todos.find((item) => item.id === id);
    setTodo(todoItem.todo);
    setEditMode(true);
    setEditTodoId(id); // Set the id of the todo being edited
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] w-1/2 shadow-lg">
        <div className="addTodo w-full mb-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Todo Manager</h1>
          <div className="flex justify-between items-center mb-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Add a new todo"
              className="w-full px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="ml-4 bg-violet-800 hover:bg-violet-900 p-3 py-1 font-bold text-white rounded-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {editMode ? "Save Changes" : "Add Todo"}
            </button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            className="mr-2"
          />
          <label className="text-lg font-semibold">Show Completed Todos</label>
        </div>

        <h2 className="text-xl font-semibold mb-3">Your Todos</h2>
        <div className="todos space-y-3">
          {todos.length === 0 && <div className="m-5 text-center">No Todos to display</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={`todo flex justify-between items-center p-4 rounded-md shadow-md bg-white hover:bg-violet-50 transition-colors ${
                    item.isCompleted ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex gap-4 items-center">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="w-5 h-5"
                    />
                    <div
                      className={`text-lg ${
                        item.isCompleted ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {item.todo}
                    </div>
                  </div>
                  <div className="btn flex gap-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-900 p-2 px-4 font-bold text-white rounded-md transition-all transform hover:scale-105"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 px-4 font-bold text-white rounded-md transition-all transform hover:scale-105"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
