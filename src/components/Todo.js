import React, { PropTypes } from 'react';

const Todo = ({ onClick, completed, text }) => {
  const todoStyle = {
    textDecoration: completed ? 'line-through' : 'none',
  };
  return <li onClick={onClick} style={todoStyle}>{text}</li>;
};
Todo.propTypes = {
  onClick: PropTypes.func,
  completed: PropTypes.bool,
  text: PropTypes.string,
};

export default Todo;
