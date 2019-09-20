import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/home/home.js'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer/reducer.js';
import thunk from 'redux-thunk';
import App from './App.js';


const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}> 
<App /> 
</Provider>, document.getElementById('root'));
registerServiceWorker();
