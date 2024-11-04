// useCreateTodo.js
import { useState } from 'react';
import { useTodos } from './TodoContext';

const useCreateTodo = () => {
  const { addTodo, todos } = useTodos();
  const [title, setTitle] = useState('');
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeId = (e) => {
    const customId = e.target.value ? Number(e.target.value) : null;
    setId(customId);
  };

  const createTodo = async () => {
    const newId = id || todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    const newTodo = { id: newId, title };

    if (todos.some((todo) => todo.id === newId)) {
      setError('Todo with this ID already exists!');
      return;
    }

    await addTodo(newTodo);
    setTitle('');
    setId(null);
    setError(null);
  };

  return { title, id, error, handleChangeTitle, handleChangeId, createTodo };
};

export default useCreateTodo;
