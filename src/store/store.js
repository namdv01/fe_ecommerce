import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import root from './root';

const store = createStore(root, composeWithDevTools(
	applyMiddleware(thunk),
));

export default store;
