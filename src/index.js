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

import {
	loadState,
	saveState
} from './localStorage';

const persistedState = loadState();

const store = createStore(todoApp, persistedState);

store.subscribe(() => {
	saveState({
		todos: store.getState().todos
	});
});

render(
	<Provider store={store}>
		<App />
	</Provider>,
	util.addNode('root')
);