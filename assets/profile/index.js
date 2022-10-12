"use strict";

let showTime = () => {
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
      document.querySelector("#clock").innerHTML = clock;
      document.querySelector("#clock-mobile").innerHTML = clock;
    });
  };
};

showTime();


let btnPlus = document.querySelector("#btnPublication");
let modal = document.querySelector(".modal-profile"); 
let html = document.querySelector("html");
let body = document.querySelector("body");

btnPlus.addEventListener( "click", () => {
  modal.style.display = "flex";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  fetchImage();
} );


let popup = document.querySelector(".modal-profile-loading");

let cancelStyle = () => {
  modal.style.display = "none";
  html.style.overflow = "visible";
  body.style.overflow = "visible";
};

document.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if (!click.includes(popup) && !click.includes(btnPlus)) cancelStyle();
});


let imgWrap = document.querySelector("#imageWrap");
let url = "http://aws.random.cat/meow";

async function fetchImage() {
  try {
    let responcse = await fetch(url);
    let data = await responcse.json();
    imgWrap.src = data.file;
  } catch (error) {
    console.log(error);
  }
}


let btnChange = document.querySelector("#changePhoto");

btnChange.addEventListener( "click", () => {
  fetchImage();
});


let btnNow = document.querySelector("#addNow");
let listPhoto = document.querySelector(".page-profile-content");

btnNow.addEventListener( "click", () => {
  let srcImg = imgWrap.src;
  let newPhoto = `<div class="profile-content-wrap"><img src="${srcImg}" alt="Фото-публикация"></div>`

  listPhoto.insertAdjacentHTML("afterbegin", newPhoto);

  cancelStyle();
} );


let btnLater = document.querySelector("#addLater");
let timing = document.querySelector(".loading-control-form");

btnLater.addEventListener( "click", () => {
  timing.style.display = "flex";
});


let output = document.querySelector("#volume");

let outputUpdate = (vol) => {
  output.value = `Через ${vol} секунд`;
};


let addPhoto = () => {
  let srcImg = imgWrap.src;
  let newPhoto = `<div class="profile-content-wrap"><img src="${srcImg}" alt="Фото-публикация"></div>`

  listPhoto.insertAdjacentHTML("afterbegin", newPhoto);
};


let btnConfirm = document.querySelector(".control-form-btn");
let inputRange = document.querySelector("#counter");

btnConfirm.addEventListener( "click", () => {
  setTimeout(addPhoto, inputRange.value * 1000);
  
  timing.style.display = "none";
  
  cancelStyle();
} );


document.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if (!click.includes(btnLater) && !click.includes(timing)) {
    timing.style.display = "none";
  }
});