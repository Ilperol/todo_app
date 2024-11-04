// TodoList.js
import React from 'react';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const { todos, deleteTodo, error } = useTodos();

  return (
    <div>
      <h2>TODO List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} 
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
