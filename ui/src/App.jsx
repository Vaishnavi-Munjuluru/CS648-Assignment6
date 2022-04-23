
/* eslint linebreak-style: ["error", "windows"] */


import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';

const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.render(element, document.getElementById('contents'));
