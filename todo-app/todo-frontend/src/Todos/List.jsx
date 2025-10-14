import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {

  const safeTodos = Array.isArray(todos) ? todos : [];

  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map(todo => {
        const doneInfo = (
          <>
            <span>This todo is done</span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
            </span>
          </>
        )

        const notDoneInfo = (
          <>
            <span>
              This todo is not done
            </span>
            <span>
              <button onClick={onClickDelete(todo)}> Delete </button>
              <button onClick={onClickComplete(todo)}> Set as done </button>
            </span>
          </>
        )

        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
              <span>
                {todo.text} 
              </span>
              {todo.done ? doneInfo : notDoneInfo}
            </div>
          </div>
        )
      }).reduce((acc, cur) => [...acc, <hr />, cur], [])}

      {/* <>
      Componente para prueba
      <div>
         <ul>
          {safeTodos.map((t) => (
              <Todo
                key={t._id}
                todo={t}
                onDelete={deleteTodo}
                onComplete={completeTodo}
              />
          ))}
          </ul>
        </div>
        </> */}
    </>
  )
}

export default TodoList
