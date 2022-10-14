"use strict";

const showTime = () => {
  window.onload = () => {
    this.setInterval( () => {
      let date = new Date();
  
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
  
      if(hours < 10) hours = `0${hours}`;
      if(minutes < 10) minutes = `0${minutes}`;
      if(seconds < 10) seconds = `0${seconds}`;

      const clock = `${hours}:${minutes}:${seconds}`;
      document.querySelector("#clock").innerHTML = clock;
      document.querySelector("#clock-mobile").innerHTML = clock;
    });
  };
};

showTime();


let cancelStyle = () => {
  modal.style.display = "none";
  popup.style.display = "none";
  modalPost.style.display = "none";
  html.style.overflow = "visible";
  body.style.overflow = "visible";
};


const imgWrap = document.querySelector(".loading-wrap-img");
const url = "http://aws.random.cat/meow";

async function fetchImage() {
  try {
    let promise = await fetch(url);
    let data = await promise.json();
    imgWrap.src = data.file;
  } catch (error) {
    console.log(error);
  }
}


let btnPlus = document.querySelector("#btnPublication");
let modal = document.querySelector(".modal-profile"); 
let html = document.querySelector("html");
let body = document.querySelector("body");
let popup = document.querySelector(".modal-profile-loading");

btnPlus.addEventListener( "click", () => {
  modal.style.display = "flex";
  popup.style.display = "flex";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  fetchImage();
} );


let btnChange = document.querySelector("#changePhoto");

btnChange.addEventListener( "click", () => {
  fetchImage();
});


let btnAddImgNow = document.querySelector("#addNow");
let listPhoto = document.querySelector(".page-profile-content");

btnAddImgNow.addEventListener( "click", () => {
  let srcImg = imgWrap.src;
  let newPhoto = `<div class="profile-content-wrap"><img src="${srcImg}" alt="Фото-публикация"></div>`

  listPhoto.insertAdjacentHTML("afterbegin", newPhoto);

  cancelStyle();
} );


let btnAddImgLater = document.querySelector("#addLater");
let timing = document.querySelector(".loading-control-form");

btnAddImgLater.addEventListener( "click", () => {
  timing.style.display = "flex";
});


let output = document.querySelector("#volume");

let outputUpdate = (vol) => {

  if (vol == 1) {
    output.value = `Через ${vol} секунду`;
  } else {
    output.value = `Через ${vol} секунд(ы)`;
  }
};


let addPhoto = () => {
  let srcImg = imgWrap.src;
  let newPhoto = `<div class="profile-content-wrap"><img src="${srcImg}" alt="Фото-публикация"></div>`;

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

  if (!click.includes(btnAddImgLater) && !click.includes(timing)) {
    timing.style.display = "none";
  }
});


let modalPost = document.querySelector(".modal-profile-post");
let postImg = document.querySelector(".post-wrap-img");

listPhoto.addEventListener( "click", (e) => {
  postImg.src = e.target.closest('img').src;

  modal.style.display = "flex";
  modalPost.style.display = "flex";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
});


modal.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if ( !click.includes(popup) && !click.includes(modalPost) ) cancelStyle();
});