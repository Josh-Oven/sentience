let spaceship = document.getElementById('spaceship');
let menuText = document.getElementById('info-menu-text');
let infoMenu = document.getElementById('info-menu');

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
