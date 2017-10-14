/*
 * Copyright 2017 by Analou Ellis
 */
import {actions} from 'mirrorx';

function arrayOfInts(lowEnd, highEnd) {
  var arr = [];
  while(lowEnd <= highEnd){
     arr.push(lowEnd++);
  }
  return arr;
}

function yatesShuffle(arr) {
  var currentIndex = arr.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

// TODO: put in models/X and be included from everywhere needed - Routes.js?
export default {
  name: 'app',
  initialState: {
    picPrefix: 'https://fifthsigma.com/Fractals',
    picList: [ "" ],
    scaryMessage: "I can't find any pictures to display.",
    picNum: 0,
    shuffleWindowBottom: 0,
    shuffleWindow: [ ],
    shuffleWindowPos: 0,
    shuffleDirection: 0,
    shuffleWindowSize: 0,
  },
  // reducers -------------------
  reducers: {
    // save all state with some extra data
    save(state, data) {
      return { ...state, ...data };
    },
  },
  // effects -------------------
  effects: {
    // set a URL if given one
    setPicPrefixAndGetPics(url) {
      if (url !== undefined) {
        actions.app.save({ picPrefix: url });
        actions.app.collectPicNamesAndDisplay(url);
      }
    },

    // change picnum by some delta
    async modNum(amt, getState) {
      var localState = getState().app;
      localState.shuffleWindowBottom += amt;
      localState.picNum += amt;
      actions.app.save({ ...localState });
    },

    // move to a random pic
    async moveRandom([moveAmt,], getState) {
      var localState = getState().app;

      localState.shuffleWindowPos += moveAmt;

      // if we've moved outside the shuffle window, move the window
      // then get back inside
      if (localState.shuffleWindowPos >= localState.shuffleWindowSize) {
        localState.shuffleWindowBottom += localState.shuffleWindowSize;
        localState.shuffleWindowPos = 0;
      } else if (localState.shuffleWindowPos < 0) {
        localState.shuffleWindowBottom -= localState.shuffleWindowSize;
        localState.shuffleWindowPos = localState.shuffleWindowSize - 1;
      }
     
      // if the shuffle window has moved outside the picture list,
      // move the window to the other side of it
      if (localState.shuffleWindowBottom > localState.picList.length - localState.shuffleWindowSize) {
        localState.shuffleWindowBottom = 0;
      } else if (localState.shuffleWindowBottom < 0) {
        localState.shuffleWindowBottom = localState.picList.length - localState.shuffleWindowSize;
      }

      // if the final picnum outside actual list, bring it back
      // on the other side
      localState.picNum = localState.shuffleWindowBottom + localState.shuffleWindow[localState.shuffleWindowPos];
      if (localState.picNum >= localState.picList.length) {
        localState.picNum -= localState.picList.length;
      } else if (localState.picNum < 0) {
        localState.picNum += localState.picList.length;
      }

      //console.log('localState==', localState);
      actions.app.save({ ...localState });
    },

    // pseudo-random walk
    async initRandWalk([shuffleDirection, shuffleWindowSize, numPics]) {
      var swb = Math.floor(Math.random() * (numPics - shuffleWindowSize))
      var sw = yatesShuffle(arrayOfInts(0, shuffleWindowSize - 1));
      //console.log('swb==',swb,'sw==',sw);
      // shuffleDirection: +1=start to end, -1=end to start
      actions.app.save({
        picNum: sw[0],
        shuffleWindow: sw,
        shuffleWindowBottom: swb,
        shuffleDirection: shuffleDirection,
        shuffleWindowSize: shuffleWindowSize,
      });
    },

    async collectPicNamesAndDisplay(url) {
      // first grab some pics from the URL - ASSUMPTIONS: everything in the
      // index.html that is /href="..."/ will be a picture we want to display,
      // and the picture will be relatively referenced from the picUrl
      var resp = await fetch(url);
      var objTxt = await resp.text();
      var myList = await objTxt.match(/href=".+?\.(jpg|png)"/g);
      if (myList !== null) {
        // parse 'em into a list
        myList.forEach((v,i) => { myList[i] = myList[i].replace(/href="(.+?)"/, "$1"); });
        // if we have pics, undefine the scaryMessage
        actions.app.save({ picPrefix: url, picList: myList, scaryMessage: undefined });
        actions.app.initRandWalk([1, myList.length, myList.length]);
        actions.routing.push('/pics');
      }
    },

    async urlChanged(evt) {
      var tmpPrefix = evt.target.value.replace(/index\.html/, "");
      tmpPrefix = tmpPrefix.replace(/url=/, "");
      actions.app.save({ picPrefix: tmpPrefix });
    }
  }
}
