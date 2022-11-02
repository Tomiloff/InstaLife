"use strict";

if ( !JSON.parse( localStorage.getItem("activeUser") ) ) {
  window.location.href = 'Authorization.html';
}


const mask = document.querySelector(".mask");

window.addEventListener( "load", () => {
  mask.classList.add("hide-loader-top");
  setTimeout( () => {
    mask.remove();
  }, 600);
});


const btnTopExit = document.querySelector("#btnTopExit");

btnTopExit.addEventListener( "click", () => {
  localStorage.removeItem("activeUser");
} );


const userNameMobile = document.querySelector(".menu-name-title");
const getUserActive = JSON.parse( localStorage.getItem("activeUser") );

userNameMobile.innerHTML = getUserActive.login;


const userAvatarInBar = document.querySelector(".bar-menu-avatar");
userAvatarInBar.src = getUserActive.avatar;