let spaceship = document.getElementById('character');
let hull = document.getElementById('spaceship');
let legOne = document.getElementById('leg1');
let legTwo = document.getElementById('leg2');
let shipWindow = document.getElementById('window');

let ship = {
  spaceship,
  hull,
  legOne,
  legTwo,
  shipWindow
}
// console.log(ship)

let menuText = document.getElementById('info-menu-text');
let infoMenu = document.getElementById('info-menu');
let distanceTester = document.getElementById('distance-tester');

infoMenu.style.display = 'none';

function openMenu () {
  let text = 'This project was made using Angular 1. My goal here was to use only vanilla languages, and use minimal libraries.\n Technologies: Vanilla JS \n - \n Vanilla CSS \n - \n HTML (obiously) \n - \n Electron \n - \n Gulp and Babel for ES6.';

  if (infoMenu.style.display == 'none') {
    infoMenu.style.animation = 'info-menu-open .7s';
    infoMenu.style.display = 'flex';
    menuText.style.opacity = 1;

      text = text.split('');
      let counter = -1;
      let textPusher = setInterval(function(){
        counter++;
        if(counter >= text.length || infoMenu.style.display == 'none'){
          counter = -1;
          clearInterval(textPusher)
          return;
        } else {
          menuText.innerHTML += (text[counter]);
          return;
        }
      }, 30)
    }

  else if (infoMenu.style.display == 'flex') {
    menuText.style.opacity = 0;
    infoMenu.style.animation = 'info-menu-close .7s';
    setTimeout(function(){
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

let shipRect = spaceship.getBoundingClientRect();

let charX = shipRect.left + shipRect.width / 2;
let charY = shipRect.top + shipRect.height / 2;

var character = {
  x: charX,
  y: charY,
  speedMultiplier: 20,
  element: spaceship
};
// console.log(character.speedMultiplier)

/// key detection (better to use addEventListener, but this will do)
document.body.onkeyup =
document.body.onkeydown = function(e){

  if (e.preventDefault) {
    e.preventDefault();
  }
  else {
    e.returnValue = false;
  }
  var kc = e.keyCode || e.which;
  keys[kc] = e.type == 'keydown';
};

/// character movement update
var moveCharacter = function(dx, dy){
  character.x += (dx||0) * character.speedMultiplier;
  character.y += (dy||0) * character.speedMultiplier;
  character.element.style.left = character.x + 'px';
  character.element.style.top = character.y + 'px';
};

/// character control
var detectCharacterMovement = function(){

  if (keys[keys.LEFT] && impact == true) {
      moveCharacter(-0.3, 0);
  } else if ( keys[keys.LEFT] && impact == false) {
    moveCharacter(-1, 0);
  }
  if ( keys[keys.RIGHT] ) {
    moveCharacter(1, 0);
  }
  if ( keys[keys.UP] ) {
    moveCharacter(0, -1);
  }
  if ( keys[keys.DOWN] ) {
    moveCharacter(0, 1);
  }
};

/// update current position on screen
moveCharacter();

/// game loop
setInterval(function(){
      detectCharacterMovement();
    }, 1000/24);

///////////////////////////////////////////////////////////////

let damageColor;
let damageShade;

let damageFeedBack = function (color, shadeColor){

  ship.hull.style.background = color;
  ship.hull.style.boxShadow = shadeColor;
  ship.legOne.style.background = color;
  ship.legOne.style.boxShadow = shadeColor;
  ship.legTwo.style.background = color;
  ship.legTwo.style.boxShadow = shadeColor;
}

let distance;

let impact = false;

let disableTime = function() {
  setTimeout(function(){
    damageColor = 'rgba(128, 128, 128, 1.0)';
    damageShade = '-9px -9px 0px 3px rgba(47, 79, 79, 1.0) inset';
    damageFeedBack(damageColor, damageShade);
    impact = false;
  }, 5000);
}

// let removeAsteroid = function(asteroidToBeRemoved){
//
// }

function ImpactTracker(trackedAsteroid) {

  this.trackedAsteroid = trackedAsteroid;

  console.log('trackedAsteroid', trackedAsteroid);

  let asteroidTracker = setInterval(function(){

      var getPositionAtCenter = function (element) {
        var data = element.getBoundingClientRect();
        return {
          x: data.left + data.width / 2,
          y: data.top + data.height / 2
        };
      };

      var getDistanceBetweenElements = function(a, b) {
        var aPosition = getPositionAtCenter(a);
        var bPosition = getPositionAtCenter(b);

        return Math.sqrt(
          Math.pow(aPosition.x - bPosition.x, 2) +
          Math.pow(aPosition.y - bPosition.y, 2)
        );
      };

      let distance = getDistanceBetweenElements(document.getElementById("character"), document.getElementById(trackedAsteroid));

      let characterT = spaceship.getBoundingClientRect().top;
      let dTestB = document.getElementById(trackedAsteroid).getBoundingClientRect().bottom;

      console.log(distance);

      (function() {
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
  }, 1000/24);

  setTimeout(function(){
    clearInterval(asteroidTracker);
    document.getElementById(trackedAsteroid).remove();
    return;
  }, 5000);
  return;
};


// let randomSpawnTime = function(){
//   return Math.floor(Math.random() * (10001 - 1000));
// }
let fastSpawn = 1000;
let moderateSpawn = 4000;
let slowSpawn = 6000;
let asteroidCount = 0;
let asteroid = document.createElement('div');
setInterval(function(){
  (function makeDiv(){
    asteroidCount += 1;
    let divsize = 50;

    var posx = document.body.clientWidth - (divsize/2);
    var posy = Math.random() * document.body.clientHeight + divsize;

      asteroid.style.cssText = 'top:' + posy + 'px; ' + 'left:' + posx + 'px; ' + ' position:fixed; width:50px; height:50px; background:red; margin-right: 20px; border: 1px solid black;';

      let asteroidClone = asteroid.cloneNode();
      asteroidClone.id = 'asteroidClone' + asteroidCount.toString();
      let asteroidCloneId = asteroidClone.id;
      document.body.appendChild(asteroidClone);
      let newTracker = new ImpactTracker(asteroidCloneId);

  })();
}, moderateSpawn)
