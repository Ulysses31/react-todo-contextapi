import React from 'react';

import PropTypes from 'prop-types';

export default function TodoItem(props) {
  const { todo } = props;

  // style
  const getCheckStyle = () => {
    return {
      textDecoration: todo.completed
        ? 'line-through'
        : 'none'
    };
  };

  return (
    <tr>
      <td>
        <input
          type='checkbox'
          value={todo.completed}
          checked={todo.completed}
          onChange={props.handleCheckCompleted}
        />
        &nbsp;
        <span style={getCheckStyle()}>{todo.title}</span>
      </td>
      <td style={{ textAlign: 'center' }}>
        <button onClick={props.handleSelectedTodo}>
          Edit
        </button>{' '}
        <button onClick={props.handleDeleted}>x</button>
      </td>
    </tr>
  );
}

// ****** Props Validations ********
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completed: PropTypes.bool,
  handleCheckCompleted: PropTypes.func.isRequired,
  handleSelectedTodo: PropTypes.func.isRequired,
  handleDeleted: PropTypes.func.isRequired
};
