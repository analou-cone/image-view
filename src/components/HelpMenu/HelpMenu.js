/*
 * Copyright 2017 by Analou Ellis
 */
import React from 'react';
import {actions, connect} from 'mirrorx';

var helpMenuVisibility = (helpMenuVisible) => {
  if (helpMenuVisible) {
    return ( 'helpMenuVisible fadeImg' );
  } else {
    return ( 'helpMenuInvisible fadeImg' );
  }
};

const HelpMenu = connect(state => {
  return { state: state.app }
})(props => (
  <div className={"row centering " + helpMenuVisibility(props.state.helpMenuVisible)}>
    <div className="row">
      <div className="twelve columns">
        {props.state.picList[props.state.picNum[props.state.visiblePicNumIdx]]}
      </div>
    </div>
    <div className="row">
      <div className="six columns">
        Go Left: <code>, ; [ -</code> <br />
        Go Right: <code>. ' = ]</code> <br />
      </div>
      <div className="six columns">
        Get Help: <code>?</code> <br />
        <button onClick={() => actions.app.slideShowToggle(undefined)} className="buttonPrimary">Slide Show: S</button>
      </div>
    </div>
  </div>
));

export default HelpMenu;
