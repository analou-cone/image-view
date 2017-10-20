/*
 * Copyright 2017 by Analou Ellis
 */
import React, { Component } from 'react';
import HelpMenu from './HelpMenu.js';

class HelpMenuContainer extends Component {
  constructor(props) {
    super(props);
    console.log('HelpMenuContainer constructor()');
  }

  componentWillMount() {
    console.log('HelpMenuContainer componentWillMount()');
  }

  componentDidMount() {
    console.log('HelpMenuContainer componentDidMount()');
  }

  componentDidUpdate() {
    console.log('HelpMenuContainer componentDidUpdate()');
  }

  render() {
    return (
      <HelpMenu />
    );
  }
}

export default HelpMenuContainer;

