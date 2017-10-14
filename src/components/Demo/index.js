/*
 * Copyright 2017 by Analou Ellis
 */

import React, { Component } from 'react';
import Demo from './Demo.js';

class DemoContainer extends Component {
  constructor(props) {
    super(props);
    console.log('windowLocation=',window.location.href);
  }

  componentWillMount() {
    console.log('getting url=', window.location.href.match(/url=(.+)/g));
  }

  render() {
    return (
      <Demo />
    );
  }
}

export default DemoContainer;

