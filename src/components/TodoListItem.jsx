import "./TodoListItem.css";

const TodoListItem = ({ todo }) => {
  return (
    <div className="todo">
      {todo}
      <button>x</button>
    </div>
  );
};

export default TodoListItem;
