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

let nextTodoId = 0;
const AddTodo = () => {
	let input;

	const onClick = () => {
		store.dispatch({
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

const Footer = () => {
	return (
		<p>
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


const TodoApp = () => {
	return (
		<div>
			<AddTodo />
			<VisibleTodoList />
			<Footer/>
		</div>
	);
};

/**
 * react container components
 */
class FilterLink extends React.Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => this.forceUpdate());
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const state = store.getState();
		const onClick = () => {
			store.dispatch({
				type: 'SET_VISIBILITY_FILTER',
				filter: props.filter
			});
		};

		return (
			<Link active={props.filter === state.visibilityFilter} onClick={onClick}>
				{props.children}
			</Link>
		);
	}
}

class VisibleTodoList extends React.Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => this.forceUpdate());
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const state = store.getState();
		const visibleTodos = getVisibleTodos(state.todos, state.visibilityFilter);
		const onTodoClick = (id) => {
			store.dispatch({
				type: 'TOGGLE_TODO',
				id
			});
		};

		return (
			<TodoList todos={visibleTodos} onTodoClick={onTodoClick} />
		);
	}
}


/**
 * main entry
 */

ReactDOM.render(<TodoApp />, root);