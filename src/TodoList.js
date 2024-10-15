import React from 'react';
import { useTodos } from './TodoContext';

const TodoList = () => {
  const { todos } = useTodos();

  return (
    <div>
      <h2>TODO List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id}: {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
