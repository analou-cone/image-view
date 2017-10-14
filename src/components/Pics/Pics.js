import React from 'react';
import {actions, connect} from 'mirrorx';

// import Header from '../../components/Header';

var scareThem = (message) => {
  if (message !== undefined) {
    return (
      <center><h1>{message}</h1></center>
    );
  }
}

const Pics = connect(state => {
  return { state: state.app, picUrl: state.app.picList[state.app.picNum] }
})(props => (
  <div>
    {scareThem(props.state.scaryMessage)}
    <div
      className="centering"
      onClick={() => actions.app.moveRandom([1,])}
    >
      <img className="mainImg" alt="" src={props.state.picPrefix + props.picUrl} />
    </div>
  </div>
));

export default Pics;
