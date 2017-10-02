import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import css from './css/style.css';
import StorePicker from './components/StorePicker';
import NotFound from './components/notFound';

import App from './components/App';


const Root = () =>
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={StorePicker}></Match>
      <Match pattern="/store/:storeId" component={App}></Match>
      <Miss component={NotFound} />
    </div>
  </BrowserRouter>

render(<Root />, document.getElementById('main'));