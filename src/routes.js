import React from 'react';
import { Route } from 'react-router';
import Home from './components/home/home.js';

export default(
  <div className="routes">
    <Route path="/" component={Home} />
  </div>
);
