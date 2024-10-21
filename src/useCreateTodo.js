import { useState, useEffect } from 'react';
import { useTodos } from './TodoContext';

const useCreateTodo = () => {
  const { todos, addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    setId(maxId + 1);
  }, [todos]);
  const handleChangeTitle = (e) => setTitle(e.target.value);
  
  const handleChangeId = (e) => {
    const customId = e.target.value ? Number(e.target.value) : null;
    setId(customId);
  };

  const createTodo = () => {
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    const newId = id !== null ? id : maxId + 1;

    
    if (todos.some((todo) => todo.id === newId)) {
      setError('Todo with this ID already exists!');
      return;
    }

    
    addTodo({ id: newId, title });
    setTitle('');
    setId(maxId + 1);
    setError(null);
  };

  return { title, id, error, handleChangeTitle, handleChangeId, createTodo };
};

export default useCreateTodo;
