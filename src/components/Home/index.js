/*
 * Copyright 2017 by Analou Ellis
 */
import React, { Component } from 'react';
import {actions} from 'mirrorx';
import Home from './Home.js';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    console.log('HomeContainer constructor()');
  }

  componentWillMount() {
    // if we got a url= on url, go to that
    var url = window.location.href.match(/url=(.+)/g);
    if (url !== null) {
      url = url[0].replace(/url=/, "").replace(/index\.html/, "").replace(/#\//, "");
      actions.app.setPicPrefixAndGetPics(url);
    }
  }

  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default HomeContainer;

