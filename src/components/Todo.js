import React from 'react';

const Todo = ({
	onClick,
	completed,
	text
}) => {

	const todoStyle = {
		textDecoration: completed ? "line-through" : "none"
	};

	return <li onClick = {onClick} style={todoStyle}>{text}</li>;
};

export default Todo;