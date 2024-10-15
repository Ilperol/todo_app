import { useState } from 'react';
import { useTodos } from './TodoContext';

const useCreateTodo = () => {
  const { todos, addTodo } = useTodos();
  const [title, setTitle] = useState('');
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeId = (e) => setId(Number(e.target.value));

  const createTodo = () => {
    const maxId = todos.length ? Math.max(...todos.map((todo) => todo.id)) : 0;
    const newId = id !== null ? id : maxId + 1;

    if (todos.some((todo) => todo.id === newId)) {
      setError('Can`t make 2 TODO with same ID!');
      return;
    }

    addTodo({ id: newId, title });
    setTitle('');
    setId(null);
    setError(null);
  };

  return { title, id, error, handleChangeTitle, handleChangeId, createTodo };
};

export default useCreateTodo;
