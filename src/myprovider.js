import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import MyContext from './mycontext';
import {
  getTodos,
  newTodo,
  updateTodo,
  deleteTodo
} from './services';

export default function MyProvider({ children }) {
  const myState = {
    todos: [],
    selectedTodo: { id: 0, title: '', completed: false }
  };

  useEffect(() => {
    const getTodoList = () => {
      getTodos().then((resp) => {
        setCurState({
          todos: resp.data,
          selectedTodo: curState.selectedTodo
        });
      });
    };
    getTodoList();
  }, []);

  const [curState, setCurState] = useState(myState);

  const masterContext = {
    todos: curState.todos,
    selectedTodo: curState.selectedTodo,
    handleCheckCompleted: (id) => {
      const td = curState.todos.find(
        (todo) => todo.id === id
      );
      updateTodo(td).then((resp) => {
        setCurState({
          todos: curState.todos.map((todo) => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
            return todo;
          }),
          selectedTodo: curState.selectedTodo
        });
      });
    },
    handleDeleted: (id) => {
      deleteTodo(id).then((resp) => {
        if (resp.status === 200) {
          setCurState({
            todos: curState.todos.filter(
              (todo) => todo.id !== id
            ),
            selectedTodo: curState.selectedTodo
          });
        }
      });
    },
    handleSelectedTodo: (todo) => {
      setCurState({
        todos: curState.todos,
        selectedTodo: todo
      });
    },
    handleNewTodo: (e) => {
      e.preventDefault();
      setCurState({
        todos: curState.todos,
        selectedTodo: { id: 0, title: '', completed: false }
      });
    },
    handleSubmitForm: (e, todo) => {
      e.preventDefault();

      if (todo.title.length === 0) return;

      if (todo.id === 0 || todo.id === undefined) {
        // insert
        todo.id = curState.todos.length + 1;
        newTodo(todo).then((resp) => {
          if (resp.data.id === 201) {
            setCurState({
              todos: [...curState.todos, todo],
              selectedTodo: {
                id: 0,
                title: '',
                completed: false
              }
            });
          }
        });
      } else {
        // update
        updateTodo(todo).then((resp) => {
          if (resp.data.id === todo.id) {
            setCurState({
              todos: curState.todos.map((td) => {
                if (td.id === todo.id) {
                  return todo;
                } else {
                  return td;
                }
              }),
              selectedTodo: {
                id: 0,
                title: '',
                completed: false
              }
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <MyContext.Provider value={masterContext}>
        {children}
      </MyContext.Provider>
    </div>
  );
}

// ****** Props Validations ********
MyProvider.propTypes = {
  children: PropTypes.object.isRequired
};
