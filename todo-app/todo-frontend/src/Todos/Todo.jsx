import React from 'react'

const Todo = ({ todo, onDeleteTodo, onCompleteTodo }) => {
  
  return (
     <li data-testid="todo-item">
      <span
        aria-label="todo-text"
        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      >
        {todo.text}
      </span>

      { !todo.done && (
        <button
          onClick={ () => onCompleteTodo?.(todo)}   //if (onCompleteTodo) { onCompleteTodo(todo) }
          aria-label="mark-done"
          type='button'
        >
          Mark done
        </button>
      )}

       <button
          onClick={ () => onDeleteTodo?.(todo)}
          aria-label="delete-todo"
          type='button'
        >
          Delete
       </button>
    </li>
  );
}

export default Todo
