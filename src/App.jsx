import { useEffect, useState } from 'react'
import './styles.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'

export default function App () {
  const [todos, setTodos] = useState(() => {
    // use state checks local value if it exists to display
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    // saves todo items to local storage on modification of todo
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])
  // passing a function when setting state is helpful if current val is required
  function addTodo (title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: title, completed: false }
      ]
    })
  }
  function deleteTodo (id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function toggleTodo (id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className='header'>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}
