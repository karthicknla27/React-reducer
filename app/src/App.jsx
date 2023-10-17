import { useReducer } from "react";
import AddTodo from "./compoents/AddTodo";
import TodoList from "./compoents/TodoList";

export default function Todo() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function todosReducer(todos, action) {
    switch (action.type) {
      case "added": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.text,
            done: false,
          },
        ];
      }
      case "changed": {
        return todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return action.todo;
          } else {
            return todo;
          }
        });
      }
      case "deleted": {
        return todos.filter((todo) => todo.id !== action.id);
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAddTask(text) {
    dispatch({
      type: "added",
      text: text,
    });
  }

  function handleEdit(todo) {
    dispatch({
      type: "changed",
      todo: todo,
    });
  }

  function handleDelete(todoId) {
    dispatch({
      type: "deleted",
      id: todoId,
    });
  }

  return (
    <>
      <h1>todo</h1>
      <AddTodo onAddTask={handleAddTask} />
      <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
