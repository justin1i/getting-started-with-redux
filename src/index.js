import React from 'react';
import ReactDOM from 'react-dom';
import {
	createStore,
	combineReducers
} from 'redux';

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
 * store
 */

const store = createStore(todoApp);


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

const AddTodo = ({
	onAddClick
}) => {
	let input;

	const onClick = () => {
		onAddClick(input.value);
		input.value = "";
	};

	return (
		<div>
			<input ref={node=> { input = node; }}/>
			<button onClick={onClick}>创建待办</button>	
		</div>
	);
};

const Footer = ({
	visibilityFilter,
	onFilterClick
}) => {
	return (
		<p>
			<FilterLink currentFilter={visibilityFilter} filter="SHOW_ALL" onClick={onFilterClick}>所有</FilterLink> {' '}
			<FilterLink currentFilter={visibilityFilter} filter="SHOW_ACTIVE" onClick={onFilterClick}>激活的</FilterLink> {' '}
			<FilterLink currentFilter={visibilityFilter} filter="SHOW_COMPLETED" onClick={onFilterClick}>完成的</FilterLink> {' '}
		</p>
	);
};


const FilterLink = ({
	filter,
	currentFilter,
	children,
	onClick
}) => {

	if (filter === currentFilter) {
		return <span>{children}</span>
	}

	return (<a href='#' onClick={e=>{ e.preventDefault(); onClick(filter);}}>{children}</a>);
};

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

let nextTodoId = 0;
const TodoApp = ({
	todos,
	visibilityFilter
}) => {
	const visibleTodos = getVisibleTodos(todos, visibilityFilter);

	const onTodoClick = (id) => {
		store.dispatch({
			type: 'TOGGLE_TODO',
			id
		});
	};
	const onAddClick = (text) => {
		store.dispatch({
			type: 'ADD_TODO',
			id: nextTodoId++,
			text
		});
	};
	const onFilterClick = (filter) => {
		store.dispatch({
			type: 'SET_VISIBILITY_FILTER',
			filter
		});
	};

	return (
		<div>
			<AddTodo onAddClick={onAddClick}/>
			<TodoList todos={visibleTodos} onTodoClick={onTodoClick} />
			<Footer visibilityFilter={visibilityFilter} onFilterClick={onFilterClick}/>
		</div>
	);
};



/**
 * main entry
 */

const render = () => {
	ReactDOM.render(
		<TodoApp 
			{...store.getState()}
		/>,
		root
	);
};

store.subscribe(render);
render();