import React from 'react';
import {
	connect
} from 'react-redux';
import {
	addTodo,
	toggleTodo,
	setVisibilityFilter
} from './action-creators';

/**
 * react presentational components
 */

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

const TodoList = ({
	todos,
	onTodoClick
}) => {
	return <ul>{todos.map(todo=><Todo key={todo.id} {...todo} onClick={()=>onTodoClick(todo.id)}/>)}</ul>;
};


const Footer = () => {
	return (
		<p>
			显示：
			{' '}
			<FilterLink filter="SHOW_ALL" >所有</FilterLink> {' '}
			<FilterLink filter="SHOW_ACTIVE">激活的</FilterLink> {' '}
			<FilterLink filter="SHOW_COMPLETED">完成的</FilterLink> {' '}
		</p>
	);
};


const Link = ({
	active,
	children,
	onClick
}) => {

	if (active) {
		return <span>{children}</span>
	}

	return (<a href='#' onClick={e=>{ e.preventDefault(); onClick();}}>{children}</a>);
};



const TodoApp = () => {
	return (
		<div>
			<AddTodo />
			<VisibleTodoList />
			<Footer />
		</div>
	);
};

/**
 * react container components
 */


const getVisibleTodos = (todos, filter) => {
	switch (filter) {
		case 'SHOW_ALL':
			return todos;
		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);
		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
	}
};

const mapStateToTodoListProps = (state) => {
	return {
		todos: getVisibleTodos(state.todos, state.visibilityFilter)
	};
};

const mapDispatchToTodoListProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch(toggleTodo(id));
		}
	};
};

const VisibleTodoList = connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);

let AddTodo = ({
	dispatch
}) => {
	let input;

	const onClick = () => {
		dispatch(addTodo(input.value))
		input.value = "";
	};

	return (
		<div>
			<input ref={node=> { input = node; }}/>
			<button onClick={onClick}>创建待办</button>	
		</div>
	);
};
AddTodo = connect()(AddTodo);


const mapStateToLinkProps = (state, ownProps) => {
	return {
		active: state.visibilityFilter == ownProps.filter
	};
};

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter));
		}
	};
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);


export default TodoApp;