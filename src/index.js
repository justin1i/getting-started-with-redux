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
 * react component
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
let nextTodoId = 0;
class TodoApp extends React.Component {
	render() {
		const {
			todos,
			visibilityFilter
		} = this.props;
		const visibleTodos = getVisibleTodos(todos, visibilityFilter);

		return (
			<div>
				<input ref={node=> { this.input = node }}/>
				<button onClick={()=> {
					store.dispatch({
						type: "ADD_TODO",
						text: this.input.value,
						id: nextTodoId++
					});
					this.input.value = "";
				}}>
					创建待办
				</button>

				<ul>
					{visibleTodos.map(todo => {
						return (
							<li key={todo.id}
								onClick={()=> {
									store.dispatch({
										type: "TOGGLE_TODO",
										id: todo.id
									});
								}}
								style={{
									textDecoration: 
										todo.completed ?
											"line-through" :
											"none"
								}}
							>
								{todo.text}
							</li>
						);
					})}
				</ul>

				<p>
					<FilterLink currentFilter={visibilityFilter} filter="SHOW_ALL">所有</FilterLink> {' '}
					<FilterLink currentFilter={visibilityFilter} filter="SHOW_ACTIVE">激活的</FilterLink> {' '}
					<FilterLink currentFilter={visibilityFilter} filter="SHOW_COMPLETED">完成的</FilterLink> {' '}
				</p>
			</div>
		);
	}
}

const FilterLink = ({
	filter,
	currentFilter,
	children
}) => {

	if (filter === currentFilter) {
		return <span>{children}</span>
	}

	const handleClick = (e) => {
		e.preventDefault();
		store.dispatch({
			type: 'SET_VISIBILITY_FILTER',
			filter
		});
	};
	return (<a href='#' onClick={handleClick}>{children}</a>);
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