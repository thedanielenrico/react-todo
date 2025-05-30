import TodoListItem from "./TodoListItem";

import { useState, useEffect } from "react";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos !== null && storedTodos.todos.length > 0) {
      setTodos(storedTodos.todos);
    }
  }, []);

  return (
    <div>
      <div>
        <label for="newTodo">Todo: </label>
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
        <TodoListItem key={t + i} todo={t} />
      ))}
    </div>
  );
};

export default TodoList;
