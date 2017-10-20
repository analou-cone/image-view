/*
 * Copyright 2017 by Analou Ellis
 */
import React from 'react';
import {Link, actions, connect} from 'mirrorx';

//import Header from '../../components/Header';

// a top-screen information message
var scareThem = (message) => {
  if (message !== undefined) {
    return (
      <center><div className="bannerMessage">
        {message} <br />
        <Link to="/"><button className="buttonPrimary">Go Back to the Start</button></Link>
      </div></center>
    );
  }
};

var divClick = (a, readyForSwipe) => {
  if (readyForSwipe) {
    a.app.slidePic([1,]);
  }
};

var touchStart = (a, event) => {
  var t = event.touches[0];
  a.app.setTouchStart(t)
};

var touchMove = (a, event) => {
  var t = event.touches[0];
  a.app.setTouchCurrent(t)
};

var touchEnd = (a, localState) => {
  const swipeThreshold = 30;
  const swipeTimeout = 300;

  var timeStamp = Math.floor(Date.now());

  // only do something if they actually swiped
  if (localState.touchStartX === -999
    || !localState.readyForSwipe
    || (timeStamp - localState.touchStartMS) > swipeTimeout
  ) {
    console.log("touchEnd() doing nothing, touchStartX, readyForSwipe, tsDelta==", localState.touchStartX, localState.readyForSwipe, timeStamp - localState.touchStartMS);
    return;
  }

  var deltaX = localState.touchCurrX - localState.touchStartX;
  var deltaY = localState.touchCurrY - localState.touchStartY;
  console.log('touchEnd() touchStartX,Y==', localState.touchStartX, localState.touchStartY, 'deltaX,Y==', deltaX, deltaY);
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // this is a left/right swipe
    if (deltaX > swipeThreshold) {
      ////console.log ("swiped right");
      if (localState.readyForSwipe) {
        a.app.slidePic([-1,]);
        a.app.resetTouches();
      }
    } else if (deltaX < (swipeThreshold * -1)) {
      //console.log ("swiped left");
      if (localState.readyForSwipe) {
        a.app.slidePic([1,]);
        a.app.resetTouches();
      }
    } else {
      console.log ("too puny left/right swipe to even dignify with a response");
    }
  } else {
    // this is up/down swipe
    if (deltaY > swipeThreshold) {
      console.log ("swiped down");
      a.app.helpMenuToggle(undefined);
    } else if (deltaY < (swipeThreshold * -1)) {
      console.log ("swiped up");
      a.app.helpMenuToggle(undefined);
    } else {
      console.log ("too puny up/down swipe to even dignify with a response");
    }
  }
};

const Pics = connect(state => {
  return { state: state.app }
})(props => (
  <div className="mainImageDiv centering"
    onClick={() => divClick(actions, props.state.readyForSwipe)}
    onTouchStart={(event) => touchStart(actions, event)}
    onTouchMove={(event) => touchMove(actions, event)}
    onTouchEnd={() => touchEnd(actions, props.state)}
  >
    {scareThem(props.state.scaryMessage)}
    <div>
      <img className={props.state.viewPicsClass[0]} alt=""
        src={props.state.picPrefix + props.state.picList[props.state.picNum[0]]}
      />
      <img className={props.state.viewPicsClass[1]} alt=""
        src={props.state.picPrefix + props.state.picList[props.state.picNum[1]]}
      />
      <img className={props.state.viewPicsClass[2]} alt=""
        src={props.state.picPrefix + props.state.picList[props.state.picNum[2]]}
      />
    </div>
  </div>
));

export default Pics;
