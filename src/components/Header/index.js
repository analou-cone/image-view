/*
 * Copyright 2017 by Analou Ellis
 */
import React from 'react';
//import {NavLink} from 'mirrorx';
import {Link, actions, connect} from 'mirrorx';

const Header = connect(state => {
  return { state: state.app, picUrl: state.app.picList[state.app.picNum] }
})(props => (
    <div className="row veryTop">
      <div className="three columns centering">
        <button className="buttonPrimary" onClick={() => actions.app.slidePic([-1,])}> &lt;--(R) </button>
      </div>
      <div className="six columns centering">
        <Link to="/pics" className="button">View Pic#{props.state.picNum}</Link>
      </div>
      <div className="three columns centering">
        <button className="buttonPrimary" onClick={() => actions.app.slidePic([1,])}> (R)--&gt; </button>
      </div>
   </div>
));

export default Header;
