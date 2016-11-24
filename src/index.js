import React from 'react';
import {
	render
} from 'react-dom';
import util from './util';
import Root from './components/Root';
import configureStore from './configureStore';
const store = configureStore();

render(<Root store={store} />, util.addNode('root'));