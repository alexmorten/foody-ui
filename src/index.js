import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './services/registerServiceWorker';
import './css/index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RouteController from './RouteController';
//import Store from './services/Store';

injectTapEventPlugin();
ReactDOM.render(<RouteController/>,
  document.getElementById('root'));
registerServiceWorker();
