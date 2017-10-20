/*
 * Copyright 2017 by Analou Ellis
 */
import React from 'react';
import mirror, {Link, actions, connect} from 'mirrorx';
import Header from '../Header';

import picModel from '../../models/picModel';
mirror.model(picModel);

const Home = connect(state => {
  return { state: state.app, picUrl: state.app.picList[state.app.picNum] }
})(props => (
  <div className="container">
    <Header />
    <center>
      <form>
        <div className="row">
          <div className="eight columns">
            <input value={props.state.picPrefix} onChange={evt => actions.app.urlChanged(evt)} className="twelve columns" placeholder="https://fifthsigma.com" id="getPicsUrl" type="text" />
          </div>
          <div className="four columns">
            <button className="buttonPrimary twelve columns" type="button" onClick={() => actions.app.collectPicNamesAndDisplay(props.state.picPrefix)}>View Pictures</button>
          </div>
        </div>
      </form>

      <div className="bannerMessage">
        Ensure you have:
        <code>Header set Access-Control-Allow-Origin *</code>
        <br />
        You can put it in your .htaccess on the site that has images to view.
      </div>

      <h1>Some Sample URLs</h1>

      <div className="row">
        <div className="six columns">
          <Link to="/url=https://faemalia.com/Fractals/Mandelbulber/"><button className="buttonPrimary twelve columns">Mandelbulber</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Sterling_and_Tierazon/0_Zeroeth/"><button className="buttonPrimary twelve columns">Sterling_and_Tierazon/0_Zeroeth/</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Sterling_and_Tierazon/1_First/"><button className="buttonPrimary twelve columns">Sterling_and_Tierazon/1_First/</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Sterling_and_Tierazon/2_Second/"><button className="buttonPrimary twelve columns">Sterling_and_Tierazon/2_Second/</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Sterling_and_Tierazon/3_Third/"><button className="buttonPrimary twelve columns">Sterling_and_Tierazon/3_Third/</button></Link>
        </div>
        <div className="six columns">
          <Link to="/url=https://faemalia.com/Fractals/Modern_Gnofract/4_Fourth/"><button className="buttonPrimary twelve columns">Modern_Gnofract/4_Fourth/</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Modern_Gnofract/5_Fifth/"><button className="buttonPrimary twelve columns">Modern_Gnofract/5_Fifth/</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Modern_Gnofract/6_Sixth/"><button className="buttonPrimary twelve columns">Modern_Gnofract/6_Sixth/</button></Link>
          <Link to="/url=https://faemalia.com/Fractals/Modern_Gnofract/7_Seventh/"><button className="buttonPrimary twelve columns">Modern_Gnofract/7_Seventh/</button></Link>
        </div>
      </div>

    </center>
  </div>
));

export default Home;
