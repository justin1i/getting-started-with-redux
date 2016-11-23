import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';

import util from './util';

import TodoApp from './components';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
	util.addNode('root')
);