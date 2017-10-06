let spaceship = document.getElementById('character');
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
var character = {
  x: 700,
  y: 400,
  speedMultiplier: 20,
  element: document.getElementById("character")
  // element.style.animation = 'spaceship-enter 6s infinite';
};

/// key detection (better to use addEventListener, but this will do)
document.body.onkeyup =
document.body.onkeydown = function(e){

  // spaceship.style.animation = 'spaceship-shake-stop 1s infinite';

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

let distance;

let impact = false;

let disableTime = function() {
  setTimeout(function(){
    console.log('i shouldnt be here')
    // keys.LEFT = 37;
    impact = false;
    return;
  }, 5000);
}


let characterT = spaceship.getBoundingClientRect().top;
let characterR = spaceship.getBoundingClientRect().right;
let characterB = spaceship.getBoundingClientRect().bottom;
let characterL = spaceship.getBoundingClientRect().left;

let dTestT = distanceTester.getBoundingClientRect().top;
let dTestR = distanceTester.getBoundingClientRect().right;
let dTestB = distanceTester.getBoundingClientRect().bottom;
let dTestL = distanceTester.getBoundingClientRect().left;

console.log(characterT, characterR, characterB, characterL);
console.log(dTestT, dTestR, dTestB, dTestL);

setInterval(function(){

  (function() {

    // console.log(distanceTester.getBoundingClientRect().x);
    // console.log(spaceship.getBoundingClientRect().x);

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

      impact;

      ///////////

      // if () {
      //
      // }

      //////////

      if (distance <= 150) {
        impact = true;
        disableTime();
      }

        distance = getDistanceBetweenElements(document.getElementById("character"),
        document.getElementById("distance-tester"));

      // console.log(distance);

  })();

}, 1000/24);
