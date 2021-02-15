import React from 'react';

import Header from './components/header';
import TodoForm from './components/todoform';
import TodoList from './components/todolist';
import MyProvider from './myprovider';

function App() {
  return (
    <MyProvider displayName='Context Display Name'>
      <div className='container'>
        <Header />
        <TodoForm />
        <TodoList />
      </div>
    </MyProvider>
  );
}

export default App;
