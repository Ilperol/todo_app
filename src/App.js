import React from 'react';
import { TodoProvider } from './TodoContext';
import PageRoutes from './PageRoutes';

const App = () => {
  return (
    <TodoProvider>
      <PageRoutes />
    </TodoProvider>
  );
};

export default App;
