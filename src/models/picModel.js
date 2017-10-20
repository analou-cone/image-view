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

// a biased shuffle - pics tend to stay together
function biasedShuffle(arr, windowSize) {
  var temporaryValue, randomIndex;
  var currBottom = arr.length - Math.floor(windowSize / 2) - 1;

  while (currBottom >= 0) {
    randomIndex = currBottom + Math.floor(Math.random() * (windowSize - 1)) + 1;

    // above can pick an index outside the array - bring it back in
    randomIndex = randomIndex % arr.length;

    // swap it with the current element.
    temporaryValue = arr[currBottom];
    arr[currBottom] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;

    currBottom--;
  }

  return arr;
}

// TODO: put in models/X and be included from everywhere needed - Routes.js?
export default {
  name: 'app',
  initialState: {
    // help menu
    helpMenuVisible: false,

    // lists of pics to display
    picPrefix: 'https://fifthsigma.com/Fractals',
    picList: [ "" ],
    scaryMessage: "I can't find any pictures to display.",

    // for swiping
    touchStartMS: 0,
    touchStartX: 0,
    touchStartY: 0,
    touchCurrX: 0,
    touchCurrY: 0,

    // for showing groups of similar pics
    shuffleWindow: [ ],
    shuffleWindowPos: 0,

    // for transition between visible/invisible pics
    readyForSwipe: true,
    visiblePicNumIdx: 1,
    picNum: [0, 0, 0],
    viewPicsClass: ['fadeImg mainImgInvisibleLeft', 'fadeImg mainImgVisible', 'fadeImg mainImgInvisibleRight'],

    slideShowRunning: false,
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

    // move from wherever we are either left/right
    async slidePic([moveAmt], getState) {
      var localState = getState().app;

      // Phase 1 --> move the pics on the screen, but don't fix their picNum
      // or try to change their appearance in any other way
      if (moveAmt > 0) {
        localState.viewPicsClass[0] = 'fadeImg mainImgInvisibleRight';
        localState.viewPicsClass[1] = 'fadeImg mainImgInvisibleLeft';
        localState.viewPicsClass[2] = 'fadeImg mainImgVisible';
      } else {
        localState.viewPicsClass[0] = 'fadeImg mainImgVisible';
        localState.viewPicsClass[1] = 'fadeImg mainImgInvisibleRight';
        localState.viewPicsClass[2] = 'fadeImg mainImgInvisibleLeft';
      }
      actions.app.save({ ...localState });

      // if change from 500 here, fix CSS fadeImg to match
      // getNextPic will be in charge of swapping visible/invisible picNum indexes
      await setTimeout(() => { actions.app.swapPicDetails([localState, moveAmt]) }, 500);
    },

    async swapPicDetails([localState, moveAmt]) {
      // Phase 2 --> load in next pics and reset locations
      var newWindowPos = (localState.shuffleWindowPos + moveAmt) % localState.picList.length;
      if (newWindowPos < 0) { newWindowPos += localState.picList.length; }
      localState.shuffleWindowPos = newWindowPos;

      // figure out what pics we'll be loading in...
      var newWindowPosMinus = (newWindowPos - 1);
      if (newWindowPosMinus < 0) { newWindowPosMinus += localState.picList.length; }
      var newWindowPosPlus = (newWindowPos + 1) % localState.picList.length;
      
      localState.picNum[0] = localState.shuffleWindow[newWindowPosMinus];
      localState.picNum[1] = localState.shuffleWindow[newWindowPos];
      localState.picNum[2] = localState.shuffleWindow[newWindowPosPlus];

      localState.viewPicsClass[0] = 'noTransition mainImgInvisibleLeft';
      localState.viewPicsClass[1] = 'noTransition mainImgVisible';
      localState.viewPicsClass[2] = 'noTransition mainImgInvisibleRight';
      actions.app.save({ ...localState });
    },

    // pseudo-random walk through the list of pics - we might create
    // lumps of related pics for effect (shuffleWindowSize defines this)
    async initRandWalk([shuffleWindowSize, numPics]) {
      var sw = biasedShuffle(arrayOfInts(0, numPics - 1), shuffleWindowSize);
      //console.log('sw==',sw);

      // start them at a random spot within the pics
      var startPlace = Math.floor(Math.random() * numPics) - 1;
      if (startPlace < 1) { startPlace = 1; }

      actions.app.save({
        shuffleWindowPos: startPlace,
        picNum: [sw[startPlace - 1], sw[startPlace], sw[startPlace + 1]],
        shuffleWindow: sw,
      });
    },

    // grab pics from URL/ - ASSUMPTIONS: everything in index.html that is
    // /href="...jpg"/ will be a picture we want to display,
    // and the picture will be relatively referenced from the picUrl
    async collectPicNamesAndDisplay(url) {
      var resp = await fetch(url);
      var objTxt = await resp.text();
      var myList = await objTxt.match(/href=".+?\.(jpg|png)"/g);
      if (myList !== null) {
        // parse 'em into a list
        myList.forEach((v,i) => { myList[i] = myList[i].replace(/href="(.+?)"/, "$1"); });

        // remove final .html from URL before using as prefix
        console.log("url is ", url);
        // eslint-disable-next-line
        url = url.replace(/[^\/]+?\.html$/, "");
        console.log("url has become ", url);

        // if we have pics, undefine the scaryMessage
        actions.app.save({ picPrefix: url, picList: myList, scaryMessage: undefined });
        actions.app.initRandWalk([Math.floor(myList.length / 8) + 1, myList.length]);
        actions.routing.replace('/pics');
      } else {
        actions.app.save({ scaryMessage: "Couldn't get pics from url=" + url });
      }
    },

    // get next pic and schedule self to go again, unless slideshow canceled
    async slideShowNextPic(whatever, getState) {
      var localState = getState().app;
      if (localState.slideShowRunning === false) { return; }
      actions.app.slidePic([+1,]);
      setTimeout(() => { actions.app.slideShowNextPic(undefined) }, 6000);
    },

    // toggle the slide show - auto next-image
    async slideShowToggle(whatever, getState) {
      // basically start sliding right away, after some short delay
      setTimeout(() => { actions.app.slideShowNextPic(undefined); }, 500);

      //console.log("slideShowToggle() toggling from ", getState().app.slideShowRunning);
      actions.app.save({ helpMenuVisible: false, slideShowRunning: !getState().app.slideShowRunning });
    },

    // toggle the help menu. duh.
    async helpMenuToggle(whatever, getState) {
      actions.app.save({ helpMenuVisible: !getState().app.helpMenuVisible });
    },

    // when they start touching, keep track of where it happened
    async setTouchStart(touchObj) {
      var x = touchObj.screenX;
      var y = touchObj.screenY;
      var timeStamp = Math.floor(Date.now());
      actions.app.save({ touchStartX: x, touchStartY: y, touchStartMS: timeStamp });
    },
    async setTouchCurrent(touchObj) {
      var x = touchObj.screenX;
      var y = touchObj.screenY;
      actions.app.save({ touchCurrX: x, touchCurrY: y });
    },
    async resetTouches() {
      actions.app.save({ touchStartX: -9999, touchStartY: -9999 });
    },
  }
}
