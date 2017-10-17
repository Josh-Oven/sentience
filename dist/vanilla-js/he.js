'use strict';

var spaceship = document.getElementById('character');
var hull = document.getElementById('spaceship');
var legOne = document.getElementById('leg1');
var legTwo = document.getElementById('leg2');
var shipWindow = document.getElementById('window');

var ship = {
  spaceship: spaceship,
  hull: hull,
  legOne: legOne,
  legTwo: legTwo,
  shipWindow: shipWindow
  // console.log(ship)

};var menuText = document.getElementById('info-menu-text');
var infoMenu = document.getElementById('info-menu');
var distanceTester = document.getElementById('distance-tester');

infoMenu.style.display = 'none';

function openMenu() {
  var text = 'This project was made using Angular 1. My goal here was to use only vanilla languages, and use minimal libraries.\n Technologies: Vanilla JS \n - \n Vanilla CSS \n - \n HTML (obiously) \n - \n Electron \n - \n Gulp and Babel for ES6.';

  if (infoMenu.style.display == 'none') {
    infoMenu.style.animation = 'info-menu-open .7s';
    infoMenu.style.display = 'flex';
    menuText.style.opacity = 1;

    text = text.split('');
    var counter = -1;
    var textPusher = setInterval(function () {
      counter++;
      if (counter >= text.length || infoMenu.style.display == 'none') {
        counter = -1;
        clearInterval(textPusher);
        return;
      } else {
        menuText.innerHTML += text[counter];
        return;
      }
    }, 30);
  } else if (infoMenu.style.display == 'flex') {
    menuText.style.opacity = 0;
    infoMenu.style.animation = 'info-menu-close .7s';
    setTimeout(function () {
      infoMenu.style.display = 'none';
      menuText.innerHTML = '';
    }, 700);
  }
};

///////////////////////////////////////////////////////////////

/// store key codes and currently pressed ones
var keys = {};
keys.UP = 38;
keys.LEFT = 37;
keys.RIGHT = 39;
keys.DOWN = 40;

/// store reference to character's position and element

var shipRect = spaceship.getBoundingClientRect();

var charX = shipRect.left + shipRect.width / 2;
var charY = shipRect.top + shipRect.height / 2;

var character = {
  x: charX,
  y: charY,
  speedMultiplier: 20,
  element: spaceship
};
// console.log(character.speedMultiplier)

/// key detection (better to use addEventListener, but this will do)
document.body.onkeyup = document.body.onkeydown = function (e) {

  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
};

/// character movement update
var moveCharacter = function moveCharacter(dx, dy) {
  character.x += (dx || 0) * character.speedMultiplier;
  character.y += (dy || 0) * character.speedMultiplier;
  character.element.style.left = character.x + 'px';
  character.element.style.top = character.y + 'px';
};

/// character control
var detectCharacterMovement = function detectCharacterMovement() {

  if (keys[keys.LEFT] && impact == true) {
    moveCharacter(-0.3, 0);
  } else if (keys[keys.LEFT] && impact == false) {
    moveCharacter(-1, 0);
  }
  if (keys[keys.RIGHT]) {
    moveCharacter(1, 0);
  }
  if (keys[keys.UP]) {
    moveCharacter(0, -1);
  }
  if (keys[keys.DOWN]) {
    moveCharacter(0, 1);
  }
};

/// update current position on screen
moveCharacter();

/// game loop
setInterval(function () {
  detectCharacterMovement();
}, 1000 / 24);

///////////////////////////////////////////////////////////////

var damageColor = void 0;
var damageShade = void 0;

var damageFeedBack = function damageFeedBack(color, shadeColor) {

  ship.hull.style.background = color;
  ship.hull.style.boxShadow = shadeColor;
  ship.legOne.style.background = color;
  ship.legOne.style.boxShadow = shadeColor;
  ship.legTwo.style.background = color;
  ship.legTwo.style.boxShadow = shadeColor;
};

var distance = void 0;

var impact = false;

var disableTime = function disableTime() {
  setTimeout(function () {
    damageColor = 'rgba(128, 128, 128, 1.0)';
    damageShade = '-9px -9px 0px 3px rgba(47, 79, 79, 1.0) inset';
    damageFeedBack(damageColor, damageShade);
    impact = false;
  }, 5000);
};

// let removeAsteroid = function(asteroidToBeRemoved){
//
// }

function ImpactTracker(trackedAsteroid) {

  this.trackedAsteroid = trackedAsteroid;

  console.log('trackedAsteroid', trackedAsteroid);

  var asteroidTracker = setInterval(function () {

    var getPositionAtCenter = function getPositionAtCenter(element) {
      var data = element.getBoundingClientRect();
      return {
        x: data.left + data.width / 2,
        y: data.top + data.height / 2
      };
    };

    var getDistanceBetweenElements = function getDistanceBetweenElements(a, b) {
      var aPosition = getPositionAtCenter(a);
      var bPosition = getPositionAtCenter(b);

      return Math.sqrt(Math.pow(aPosition.x - bPosition.x, 2) + Math.pow(aPosition.y - bPosition.y, 2));
    };

    var distance = getDistanceBetweenElements(document.getElementById("character"), document.getElementById(trackedAsteroid));

    var characterT = spaceship.getBoundingClientRect().top;
    var dTestB = document.getElementById(trackedAsteroid).getBoundingClientRect().bottom;

    console.log(distance);

    (function () {
      if (dTestB - characterT >= 0 && dTestB - characterT <= 130.5 && distance <= 135) {
        damageColor = 'rgba(255, 0, 0, .7)';
        damageShade = '-9px -9px 0px 3px rgba(255, 0, 0, .8) inset';
        damageFeedBack(damageColor, damageShade);
        impact = true;
        disableTime();
        return;
      }
    })();
    return;
  }, 1000 / 24);

  setTimeout(function () {
    clearInterval(asteroidTracker);
    document.getElementById(trackedAsteroid).remove();
    return;
  }, 5000);
  return;
};

// let randomSpawnTime = function(){
//   return Math.floor(Math.random() * (10001 - 1000));
// }
var fastSpawn = 1000;
var moderateSpawn = 4000;
var slowSpawn = 6000;
var asteroidCount = 0;
var asteroid = document.createElement('div');
setInterval(function () {
  (function makeDiv() {
    asteroidCount += 1;
    var divsize = 50;

    var posx = document.body.clientWidth - divsize / 2;
    var posy = Math.random() * document.body.clientHeight + divsize;

    asteroid.style.cssText = 'top:' + posy + 'px; ' + 'left:' + posx + 'px; ' + ' position:fixed; width:50px; height:50px; background:red; margin-right: 20px; border: 1px solid black;';

    var asteroidClone = asteroid.cloneNode();
    asteroidClone.id = 'asteroidClone' + asteroidCount.toString();
    var asteroidCloneId = asteroidClone.id;
    document.body.appendChild(asteroidClone);
    var newTracker = new ImpactTracker(asteroidCloneId);
  })();
}, moderateSpawn);