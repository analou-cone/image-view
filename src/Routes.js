/*
 * Copyright 2017 by Analou Ellis
 */
import React from 'react';
import {Router, Route} from 'mirrorx';

// if we want a header everywhere...
//import Header from './components/Header';

// Routes
import HomeContainer from './components/Home';
import PicsContainer from './components/Pics';
import DemoContainer from './components/Demo';

const Routes = () => (
  <Router>
    <div>
      {/* if we want header everywhere... <Route path="*" component={Header} /> */}
      <Route exact path="/" component={HomeContainer} />
      <Route path="/url=:url" component={HomeContainer} />
      <Route exact path="/pics" component={PicsContainer} />
      <Route exact path="/demo" component={DemoContainer} />
    </div>
  </Router>
);

export default Routes;
