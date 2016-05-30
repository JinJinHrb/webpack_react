import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

persist(alt, storage, 'app');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
