import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './store/rootReducer';
// import store from './store';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// TODO: Get state from a database...
// For now, we're going to use some default data.
import defaultWAD from './defaultWAD';
const store = createStore(rootReducer, { level: defaultWAD }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const Main = () => (
  <Provider store={ store }>
    <App />
  </Provider>
)

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
