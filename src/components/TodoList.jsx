import TodoListItem from "./TodoListItem";

import { useState, useEffect } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isTabActive, setIsTabActive] = useState(
    document.visibilityState === "visible"
  );

  const handleVisibityChange = () => {
    setIsTabActive(document.visibilityState === "visible");
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibityChange);
  }, []);

  const handleAddNewTodo = () => {
    if (newTodo.length > 0) {
      setTodos((prev) => [...prev, newTodo]);
      localStorage.setItem(
        "todos",
        JSON.stringify({ todos: [...todos, newTodo] })
      );
      setNewTodo("");
    }
  };

  const deleteTodo = (index) => {
    const newArr = todos.slice();
    newArr.splice(index, 1);
    setTodos(newArr);
    localStorage.setItem("todos", JSON.stringify({ todos: [...newArr] }));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos !== null && storedTodos.todos.length > 0) {
      setTodos(storedTodos.todos);
    } else {
      setTodos([]);
    }
  }, [isTabActive]);

  return (
    <div>
      <div>
        <label htmlFor="newTodo">Todo: </label>
        <input
          name="newTodo"
          id="newTodo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddNewTodo();
            }
          }}
        />
        <button onClick={handleAddNewTodo} disabled={newTodo.length < 1}>
          Add
        </button>
      </div>
      {todos.map((t, i) => (
        <TodoListItem
          key={t + i}
          todo={t}
          handleDelete={deleteTodo}
          index={i}
        />
      ))}
    </div>
  );
};

export default TodoList;
