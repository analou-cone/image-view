/*
 * Copyright 2017 by Analou Ellis
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Pics from './Pics.js';
import HelpMenu from '../HelpMenu';
import {actions} from 'mirrorx';

class PicsContainer extends Component {
  constructor(props) {
    super(props);
    console.log('PicsContainer constructor()');
  }

  componentWillMount() {
    console.log('PicsContainer componentWillMount()');
  }

  componentDidMount() {
    console.log('PicsContainer componentDidMount()');
    this.focusFakeInput();
  }

  componentDidUpdate() {
    console.log('PicsContainer componentDidUpdate()');
    this.focusFakeInput();
  }

  focusFakeInput() {
    ReactDOM.findDOMNode(this.refs.fakeInput).focus();
  }

  keyPressed(a, event) {
    var theKey = event.key;
    //console.log("keyPressed() evt.key==", theKey);
    if (theKey === ',' || theKey === ';' || theKey === '[' || theKey === '-') { a.app.slidePic([-1,]); }
    if (theKey === '.' || theKey === "'" || theKey === ']' || theKey === '=') { a.app.slidePic([+1,]); }
    if (theKey === '?') { a.app.helpMenuToggle(undefined); }
    if (theKey === 's') { a.app.slideShowToggle(undefined); }
  };

  render() {
    return (
      <div onClick={() => this.focusFakeInput()}>
        <Pics />
        <form>
          <input type="radio" ref="fakeInput" className="fakeInput"
            onKeyPress={(event) => this.keyPressed(actions, event)}
            value=""
          />
        </form>
        <HelpMenu />
      </div>
    );
  }
}

export default PicsContainer;

