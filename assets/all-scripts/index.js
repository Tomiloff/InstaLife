"use strict";

const mask = document.querySelector(".mask");

window.addEventListener( "load", () => {
  mask.classList.add("hide-loader-top");
  setTimeout( () => {
    mask.remove();
  }, 600);
});