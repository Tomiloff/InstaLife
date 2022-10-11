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
      document.querySelector("#clock").innerHTML = clock;
      document.querySelector("#clock-mobile").innerHTML = clock;
    });
  };
};

userTime();



let btnPublication = document.querySelector("#btnPublication");
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
    html.style.overflow = "visible";
    body.style.overflow = "visible";
  }
});



let collageContent = document.querySelector(".page-profile-content");
let buttonChange = document.querySelector("#changePhoto");
let buttonAddNow = document.querySelector("#addNow");
let imageWrap = document.querySelector("#imageWrap");
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

buttonChange.addEventListener( "click", () => {
  fetchImage();
});

buttonAddNow.addEventListener( "click", () => {
  let srcImage = imageWrap.src;
  let newPhoto = `<div class="profile-content-wrap"><img src="${srcImage}" alt="Фото-публикация"></div>`

  collageContent.insertAdjacentHTML("afterbegin", newPhoto);
} );



let buttonAddLater = document.querySelector("#addLater");
let controlForm = document.querySelector(".loading-control-form");

buttonAddLater.addEventListener( "click", () => {
  controlForm.style.display = "flex";
});


let output = document.querySelector("#volume");

let outputUpdate = (vol) => {
  output.value = `Через ${vol} секунд`;
  return vol;
};

let buttonConfirm = document.querySelector(".control-form-btn");
let inputSlider = document.querySelector("#counter");

let addPhoto = () => {
  let srcImage = imageWrap.src;
  let newPhoto = `<div class="profile-content-wrap"><img src="${srcImage}" alt="Фото-публикация"></div>`

  collageContent.insertAdjacentHTML("afterbegin", newPhoto);
};

buttonConfirm.addEventListener( "click", () => {
  setTimeout(addPhoto, inputSlider.value * 1000);
  controlForm.style.display = "none";
} );

document.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if (!click.includes(buttonAddLater) && !click.includes(controlForm)) {
    controlForm.style.display = "none";
  }
});