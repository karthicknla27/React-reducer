import React, { useState } from "react";

export default function TodoList({ todos, onEdit, onDelete }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoEntries todo={todo} onChange={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

function TodoEntries({ todo, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onChange({
      ...todo,
      text: editedText,
    });
    setIsEditing(false);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => {
          onChange({
            ...todo,
            done: e.target.checked,
          });
        }}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </>
      ) : (
        <>
          {todo.text}
          <button onClick={handleEdit}>Edit</button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </label>
  );
}
