"use strict";

let userTime = () => {
  window.onload = () => {
    this.setInterval( () => {
      let date = new Date();
  
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
  
      if(hours < 10) hours = `0${hours}`;
      if(minutes < 10) minutes = `0${minutes}`;
      if(seconds < 10) seconds = `0${seconds}`;

      let clock = `${hours}:${minutes}:${seconds}`;
      document.getElementById("clock").innerHTML = clock;
      document.getElementById("clock-mobile").innerHTML = clock;
    });
  };
};

userTime();



let btnPublication = document.getElementById("btnPublication");
let modal = document.querySelector(".modal-profile"); 
let popup = document.querySelector(".modal-profile-loading");
let html = document.querySelector("html");
let body = document.querySelector("body");

btnPublication.addEventListener( "click", () => {

  modal.style.display = "flex";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  fetchImage();
} );

document.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if (!click.includes(popup) && !click.includes(btnPublication)) {
    modal.style.display = "none";
    html.style.overflow = "auto";
    body.style.overflow = "auto";
  }
});



let btnChangePhoto = document.getElementById("changePhoto");
let imageWrap = document.getElementById("imageWrap");
let url = "http://aws.random.cat/meow";

async function fetchImage() {
  try {
    let responcse = await fetch(url);
    let data = await responcse.json();
    imageWrap.src = data.file;
  } catch (error) {
    console.log(error);
  }
}

btnChangePhoto.addEventListener( "click", () => {
  fetchImage();
});