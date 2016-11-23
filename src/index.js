import React from 'react';
import ReactDOM from 'react-dom';
import {
	createStore,
	combineReducers
} from 'redux';
import {
	Provider,
	connect
} from 'react-redux';

import util from './util';

const root = util.addNode('root');


/**
 * reducer
 */

const todo = (state, action) => {
	switch (action.type) {
		case "ADD_TODO":
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case "TOGGLE_TODO":
			if (state.id !== action.id) {
				return state;
			}

			return {
				...state,
				completed: !state.completed
			};
		default:
			return state;
	}
};

const todos = (state = [], action) => {
	switch (action.type) {
		case "ADD_TODO":
			return [
				...state,
				todo(undefined, action)
			];
		case "TOGGLE_TODO":
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
	switch (action.type) {
		case "SET_VISIBILITY_FILTER":
			return action.filter;
		default:
			return state;
	}
};

const todoApp = combineReducers({
	todos,
	visibilityFilter
});


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
			dispatch({
				type: 'TOGGLE_TODO',
				id
			});
		}
	};
};

const VisibleTodoList = connect(
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);

let nextTodoId = 0;
let AddTodo = ({
	dispatch
}) => {
	let input;

	const onClick = () => {
		dispatch({
			type: 'ADD_TODO',
			text: input.value,
			id: nextTodoId++
		})
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
			dispatch({
				type: 'SET_VISIBILITY_FILTER',
				filter: ownProps.filter
			});
		}
	};
};

const FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link);


/**
 * main entry
 */

ReactDOM.render(
	<Provider store={createStore(todoApp)}>
		<TodoApp />
	</Provider>,
	root
);