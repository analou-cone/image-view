/*
 * Copyright 2017 by Analou Ellis
 */
import React, { Component } from 'react';
import Pics from './Pics.js';

class PicsContainer extends Component {
  constructor(props) {
    super(props);
    console.log('PicsContainer constructor()');
  }

  componentWillMount() {
    console.log('PicsContainer componentWillMount()');
  }

  render() {
    return (
      <Pics />
    );
  }
}

export default PicsContainer;

