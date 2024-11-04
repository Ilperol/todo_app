import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const PageRoutes = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Todo List</Link>
          </li>
          <li>
            <Link to="/create">Create Todo</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/create" element={<TodoForm />} />
      </Routes>
    </Router>
  );
};

export default PageRoutes;
