"use strict";

const mask = document.querySelector(".mask");

window.addEventListener( "load", () => {
  mask.classList.add("hide-loader-top");
  setTimeout( () => {
    mask.remove();
  }, 600);
});


const redirect = `<meta http-equiv="refresh" content="0, URL='Authorization.html'">`
const head = document.querySelector("head");
const btnTopExit = document.querySelector("#btnTopExit");

btnTopExit.addEventListener( "click", () => {
  localStorage.setItem( `redirect`, JSON.stringify(redirect) );
} );

const redirectStorage = JSON.parse( localStorage.getItem("redirect") );

head.insertAdjacentHTML("afterbegin", redirectStorage);


if ( JSON.parse( localStorage.getItem("listAccaunts") == null ) ) {
  window.location.href = 'Authorization.html';
}

