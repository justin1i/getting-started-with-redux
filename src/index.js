import React from 'react';
import {
	render
} from 'react-dom';
import {
	Provider
} from 'react-redux';
import {
	createStore
} from 'redux';

import util from './util';

import App from './components/App';
import todoApp from './reducers';

const persistedState = {
	todos: [{
		id: '0',
		text: 'Welcome back!',
		completed: false,
	}]
};

const store = createStore(todoApp, persistedState);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	util.addNode('root')
);