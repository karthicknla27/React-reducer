import { useReducer, useEffect } from "react";
import AddTodo from "./compoents/AddTodo";
import TodoList from "./compoents/TodoList";

export default function Todo() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  function todosReducer(todos, action) {
    switch (action.type) {
      case "added": {
        const newTodo = {
          id: new Date().getTime(),
          text: action.text,
          done: false,
        };
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      case "changed": {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return action.todo;
          } else {
            return todo;
          }
        });
        // Save updated todos to local storage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      case "deleted": {
        const updatedTodos = todos.filter((todo) => todo.id !== action.id);
        // Save updated todos to local storage
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  // Clear local storage when the component is unmounted
  useEffect(() => {
    return () => {
      localStorage.removeItem("todos");
    };
  }, []);

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
      <h1>Todo</h1>
      <AddTodo onAddTask={handleAddTask} />
      <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
