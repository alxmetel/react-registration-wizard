import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';

window.onload = () => { // Prevent HTML from loading before CSS
  ReactDOM.render(<App />, document.getElementById('app'));
}