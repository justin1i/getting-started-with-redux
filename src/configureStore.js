import throttle from 'lodash/throttle';
import todoApp from './reducers';
import { loadState, saveState } from './localStorage';
import { createStore } from 'redux';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);
  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000));
  return store;
};

export default configureStore;
