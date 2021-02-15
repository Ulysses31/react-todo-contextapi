import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import MyContext from '../mycontext';

export default function TodoForm() {
  const cntx = useContext(MyContext);
  const [curTodo, setCurTodo] = useState(cntx.selectedTodo);

  useEffect(() => {
    setCurTodo(cntx.selectedTodo);
  }, [cntx.selectedTodo]);

  const handleChangeTodoInfo = (e) => {
    setCurTodo({
      id: curTodo.id,
      title: e.target.value,
      completed: curTodo.completed
    });
  };

  return (
    <MyContext.Consumer>
      {(context) => (
        <form
          onSubmit={(e) =>
            context.handleSubmitForm(e, curTodo)
          }
        >
          <input
            type='text'
            id='title'
            name='title'
            placeholder='enter a title'
            value={curTodo.title}
            onChange={handleChangeTodoInfo}
          />
          <button onClick={context.handleNewTodo}>
            New
          </button>
          <button>Save</button>
        </form>
      )}
    </MyContext.Consumer>
  );
}
