// Redux Stuff.
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Main Redcuer.
import reducer from './reducers';

// Exporting the store.
export default createStore(reducer, applyMiddleware(thunk));