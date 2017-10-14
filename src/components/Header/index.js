import React from 'react';
//import {NavLink} from 'mirrorx';
import {Link, actions, connect} from 'mirrorx';

const Header = connect(state => {
  return { state: state.app, picUrl: state.app.picList[state.app.picNum] }
})(props => (
    <div className="row">
      <div className="three columns centering">
        <button className="button-primary" onClick={() => actions.app.moveRandom([-1,])}> &lt;--(R) </button>
      </div>
      <div className="two columns centering">
        <button className="button-primary" onClick={() => actions.app.modNum(-1)}> &lt;-- </button>
      </div>
      <div className="two columns centering">
        <Link to="/pics" className="button">#{props.state.picNum}</Link>
      </div>
      <div className="two columns centering">
        <button className="button-primary" onClick={() => actions.app.modNum(+1)}> --&gt; </button>
      </div>
      <div className="three columns centering">
        <button className="button-primary" onClick={() => actions.app.moveRandom([1,])}> (R)--&gt; </button>
      </div>
   </div>
));

export default Header;
