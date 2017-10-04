'use strict';

var ss = document.getElementById('ss-outer-container');
var ssInner = document.getElementById('scroll-bar-hider');
var ssText = document.getElementById('ss-container');
var close = document.getElementById('ss-close');

ss.style.visibility = 'hidden';

function ssToggle() {
  if (ss.style.visibility == 'hidden') {

    ssInner.style.visibility = 'visible';
    ssInner.style.animation = 'ss-open .5s';

    ss.style.animation = 'ss-border-fade-in .2s';
    ss.style.visibility = 'visible';
    ss.style.overflow = 'hidden';

    setTimeout(function () {
      ss.style.overflow = 'visible';
    }, 500);
  } else if (ss.style.visibility == 'visible') {

    ss.style.overflow = 'hidden';
    ss.style.animation = 'ss-border-fade-out .9s';

    ssInner.style.animation = 'ss-close .5s';

    setTimeout(function () {
      ssInner.style.visibility = 'hidden';
    }, 500);

    setTimeout(function () {
      ss.style.visibility = 'hidden';
      ss.style.overflow = 'visible';
    }, 900);
  }
}

// Global variables without any specified type (type will be determined when used in the functions below).
var obj, x, y, prev_x, prev_y;

function drag(e) {
  // Yep, use the object I just clicked on.
  obj = e.target;
  // Set current X coordinate minus distance left from offsetParent node.
  prev_x = x - obj.offsetLeft;
  // Set current Y coordinate minus distance top from offsetParent node.
  prev_y = y - obj.offsetTop;
}

function move(e) {
  // Always track and record the mouse's current position.
  if (e.pageX) {
    x = e.pageX; // X coordinate based on page, not viewport.
    y = e.pageY; // Y coordinate based on page, not viewport.
  }
  //  else if (e.clientX) {
  //    x=clientX; // X coordinate based on viewport.
  //    y=clientY; // Y coordinate based on viewport.
  //  }

  // If the object specifically is selected, then move it to the X/Y coordinates that are always being tracked.
  if (obj) {
    obj.style.left = x - prev_x + 'px';
    obj.style.top = y - prev_y + 'px';
  }
}

function drop() {
  // Remove the attached event from the element so it doesn't keep following your mouse. :)
  obj = false;
}

// Make a specific element movable
document.getElementById('ss-outer-container').onmousedown = drag;
document.onmousemove = move;
document.onmouseup = drop;