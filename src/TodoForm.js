  import React from 'react';
import useCreateTodo from './useCreateTodo';

const TodoForm = () => {
  const { title, id, error, handleChangeTitle, handleChangeId, createTodo } = useCreateTodo();

  return (
    <div>
      <h2>Create New TODO</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div>
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={handleChangeTitle}
        />
      </div>
      
      <div>
        <input
          type="number"
          placeholder="Todo ID"
          value={id !== null ? id : ''}
          onChange={handleChangeId}
        />
      </div>
      
      <button onClick={createTodo}>Add Todo</button>
    </div>
  );
};

export default TodoForm;
