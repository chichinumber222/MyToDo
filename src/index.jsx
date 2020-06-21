import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

const x = 100;
const y = 70;
const fn = (x1) => {
  return `Ivan${x1}`;
}
fn(x);

const obj = { name: 'John', age: 33, city: 'Oskol' };
