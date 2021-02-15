import React from 'react';

import MyContext from '../mycontext';
import TodoItem from './todoitem';

export default function TodoList() {
  return (
    <MyContext.Consumer>
      {(context) => (
        <table border='0' width='100%' cellSpacing='3px'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {context.todos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                handleCheckCompleted={() =>
                  context.handleCheckCompleted(todo.id)
                }
                handleDeleted={() =>
                  context.handleDeleted(todo.id)
                }
                handleSelectedTodo={() =>
                  context.handleSelectedTodo(todo)
                }
              />
            ))}
          </tbody>
        </table>
      )}
    </MyContext.Consumer>
  );
}
