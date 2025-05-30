import "./TodoListItem.css";

const TodoListItem = ({ todo, handleDelete, index }) => {
  return (
    <div className="todo">
      {todo}
      <button onClick={() => handleDelete(index)}>x</button>
    </div>
  );
};

export default TodoListItem;
