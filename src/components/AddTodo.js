import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  let input;

  const onClick = () => {
    dispatch(addTodo(input.value));
    input.value = '';
  };

  return (
    <div>
      <input ref={node => { input = node; }} />
      <button onClick={onClick}>
        创建待办
      </button>
    </div>
  );
};
AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
AddTodo = connect()(AddTodo);


export default AddTodo;
