'use strict';

var spaceship = document.getElementById('character');
var hull = document.getElementById('spaceship');
var legOne = document.getElementById('leg1');
var legTwo = document.getElementById('leg2');
var shipWindow = document.getElementById('window');
var blackHole = document.getElementById('black-hole');
var playButton = document.getElementById('play-button');
var playButtonText = document.getElementById('play-button-text');
var scoreText = document.getElementById('score-text');
var death = false;
var points = 0;
scoreText.innerHTML = points;
var score = points + ' POINTS';

console.log('height', document.body.clientHeight);
console.log('width', document.body.clientWidth);

var ship = {
  spaceship: spaceship,
  hull: hull,
  legOne: legOne,
  legTwo: legTwo,
  shipWindow: shipWindow

  //////////////////////////////////

  //////// info-menu ////////

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
    moveCharacter(-0.1, 0);
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
var playCounter = 0;
var blackHoleCounter = 0;

//////////////////////////////////

//////// impact/feedback function ////////

var disableTime = function disableTime() {
  setTimeout(function () {
    damageColor = 'rgba(128, 128, 128, 1.0)';
    damageShade = '-9px -9px 0px 3px rgba(47, 79, 79, 1.0) inset';
    damageFeedBack(damageColor, damageShade);
    impact = false;
  }, 5000);
};

//////////////////////////////////

//////// ship/asteroid tracker ////////

function ImpactTracker(trackedAsteroid) {

  this.trackedAsteroid = trackedAsteroid;

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
  }, 1500);
  return;
};

//////////////////////////////////

//////// asteroid spawner ////////

var fastSpawn = 1000;
var asteroidCount = 0;
var asteroid = document.createElement('div');

var gamePlay = true;
var spawnRate = void 0;
var spawnLocation = void 0;
var posY = void 0;

function asteroidSpawner() {
  // console.log(playCounter)
  playCounter;

  function spawn() {

    function makeDiv() {

      if (asteroidCount % 2 != 0) {
        posY = Math.floor(Math.random() * (document.body.clientHeight - 50));
      } else if (asteroidCount % 2 == 0) {
        posY = spaceship.getBoundingClientRect().top;
      }

      asteroidCount += 1;
      var divsize = 50;

      var lB = Math.floor(Math.random() * (100 - 1));
      var lT = Math.floor(Math.random() * (100 - 1));
      var rB = Math.floor(Math.random() * (100 - 1));
      var rT = Math.floor(Math.random() * (100 - 1));

      var posX = -(divsize / 2);

      asteroid.style.cssText = 'top:' + posY + 'px; ' + 'left:' + posX + 'px; ' + ' position:fixed; width:50px; height:50px; background:grey; animation: asteroid-move 3s; border-top-left-radius:' + lT + '%; border-top-right-radius:' + rT + '%; border-bottom-right-radius:' + rB + '%; border-bottom-left-radius:' + lB + '%;';

      var asteroidClone = asteroid.cloneNode();
      asteroidClone.id = 'asteroidClone' + asteroidCount.toString();
      var asteroidCloneId = asteroidClone.id;
      document.body.appendChild(asteroidClone);
      var newTracker = new ImpactTracker(asteroidCloneId);
    };

    spawnRate = setInterval(function () {
      makeDiv();
    }, 1000);
  }

  function killIt() {
    if (playCounter % 2 != 0) {
      clearInterval(spawnRate);
    } else if (playCounter % 2 == 0) {
      spawn();
    }
  }

  killIt();
  playCounter++;
}

//////////////////////////////////

//////// ship/coinTracker ////////

function CoinImpactTracker(trackedCoin, coinPosition) {

  var coinTracker = setInterval(function () {

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

    var distance = getDistanceBetweenElements(document.getElementById("character"), document.getElementById(trackedCoin));

    var characterT = spaceship.getBoundingClientRect().top;
    var dTestB = document.getElementById(trackedCoin).getBoundingClientRect().bottom;

    (function () {
      if (dTestB - characterT >= 0 && dTestB - characterT <= 130.5 && distance <= 135) {
        points += 10;
        scoreText.innerHTML = points;
        clearInterval(coinTracker);
        document.getElementById(trackedCoin).remove();
        console.log(points);
        return;
      }
    })();

    return;
  }, 1000 / 24);

  setTimeout(function () {
    clearInterval(coinTracker);
    document.getElementById(trackedCoin).remove();
    return;
  }, 5000);
  return;
};

//////////////////////////////////

//////// coin spawner ////////

var coinCount = 0;
var coin = document.createElement('div');
var coinRate = void 0;

function coinSpawner() {

  function spawn() {

    function makeCoin() {

      coinCount += 1;
      var divsize = 50;

      var posX = -(divsize / 2);
      var posY = Math.floor(Math.random() * (document.body.clientHeight - 50));
      var coinPosition = posY;

      coin.style.cssText = 'top:' + posY + 'px; ' + 'left:' + posX + 'px; ' + ' position:fixed; width:50px; height:50px; background:violet; border-radius:50%; animation: asteroid-move 7s; box-shadow: var(--low-neon-violet);';

      var coinClone = coin.cloneNode();
      coinClone.id = 'coinClone' + coinCount.toString();
      var coinCloneId = coinClone.id;
      document.body.appendChild(coinClone);
      var newCoin = new CoinImpactTracker(coinCloneId, coinPosition);
    };

    coinRate = setInterval(function () {
      makeCoin();
    }, 5000);
  }

  function killIt() {
    if (playCounter % 2 == 0) {
      clearInterval(coinRate);
    } else if (playCounter % 2 != 0) {
      spawn();
    }
  }

  killIt();
}

//////////////////////////////////

//////// ship/black-hole tracker ////////

function stopSpawners() {
  clearInterval(spawnRate);
  clearInterval(coinRate);
  playCounter++;
}

var blackHoleTracker = void 0;
var blackHoleSize = document.body.clientHeight - 40;
var blackHoleRight = blackHoleSize - (blackHoleSize * 2 + 20);
blackHole.style.height = blackHoleSize + 'px';
blackHole.style.width = blackHoleSize + 'px';
blackHole.style.right = blackHoleRight + 'px';

function deathTracker() {
  blackHoleCounter;
  console.log(blackHoleCounter);

  function gameOver() {
    if (death == true) {
      clearInterval(blackHoleTracker);
      moveCharacter = null;
      stopSpawners();
      return;
    }
  }

  var blackHoleTracker = setInterval(function () {

    if (blackHoleCounter % 2 == 0) {
      clearInterval(blackHoleTracker);
      return;
    }

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

    var deathDistance = getDistanceBetweenElements(document.getElementById("character"), document.getElementById('black-hole'));

    var characterT = spaceship.getBoundingClientRect().top;
    var dTestB = document.getElementById('black-hole').getBoundingClientRect().bottom;
    var distanceNeeded = blackHoleSize / 2 + 95;

    if (deathDistance <= distanceNeeded) {
      damageColor = 'rgba(255, 0, 0, .7)';
      damageShade = '-9px -9px 0px 3px rgba(255, 0, 0, .8) inset';
      damageFeedBack(damageColor, damageShade);
      death = true;
      gameOver();
      return;
    }

    if (impact == true) {
      blackHoleRight += 1;
      blackHole.style.right = blackHoleRight + 'px';
      return;
    } else if (impact == false) {
      blackHoleRight += .5;
      blackHole.style.right = blackHoleRight + 'px';
      return;
    }
  }, 1000 / 24);

  console.log(blackHoleCounter);

  blackHoleCounter++;
};

//////////////////////////////////

//////// toggle game play ////////

var playButtonCounter = 0;

function toggleGamePlay() {
  playButtonCounter;

  asteroidSpawner();
  coinSpawner();
  deathTracker();

  if (playButtonCounter % 2 == 0) {
    playButtonText.innerHTML = 'PAUSE';
  } else if (playButtonCounter % 2 != 0) {
    playButtonText.innerHTML = 'PLAY';
  }

  playButtonCounter++;
  return;
}

//////////////////////////////////