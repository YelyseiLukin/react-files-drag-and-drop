import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './containers/App';

import './scss/index.scss';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(
    <App/>,
    root,
);
