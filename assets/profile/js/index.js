"use strict";

const showTime = () => {
  window.onload = () => {
    window.setInterval( () => {
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


import {posts} from "./assets.js";


const listPhoto = document.querySelector(".page-profile-content");

const showPosts = () => {
  listPhoto.innerHTML = "";

  posts.map( (index) => {
    let newPhoto = `<div id="${index.id}" class="profile-content-wrap">
                    <img src="${index.src}" 
                    alt="Фото-публикация"></div>`;

    listPhoto.insertAdjacentHTML("afterbegin", newPhoto);
  } );
};

showPosts();


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


const btnPlus = document.querySelector("#btnPublication");
const modal = document.querySelector(".modal-profile"); 
const html = document.querySelector("html");
const body = document.querySelector("body");
const popup = document.querySelector(".modal-profile-loading");
const loader = document.querySelector(".preloader");

btnPlus.addEventListener( "click", () => {
  loader.classList.remove("hide-loader");
  modal.style.display = "flex";
  popup.style.display = "flex";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  fetchImage();
} );


imgWrap.addEventListener( "load", () => {
  loader.classList.add("hide-loader");
} );


const btnChange = document.querySelector("#changePhoto");

btnChange.addEventListener( "click", () => {
  loader.classList.remove("hide-loader");
  fetchImage();
});


const cancelStyle = () => {
  modal.style.display = "none";
  popup.style.display = "none";
  modalPost.style.display = "none";
  html.style.overflow = "visible";
  body.style.overflow = "visible";
};


const addPhoto = () => {
  let count = posts.length;
  count ++;

  let newPost = {
    id: count, 
    userName: 'name', 
    description: "", 
    src: imgWrap.src,
    like: 0,
    comments: []
  };

  posts.push(newPost);
};


const inputTextForm = document.querySelector(".loading-control-comment");

let submitText = () => {
  posts[posts.length - 1].description = inputTextForm.value;

  inputTextForm.value = "";
};


const btnAddImgNow = document.querySelector("#addNow");

btnAddImgNow.addEventListener( "click", () => {
  addPhoto(),cancelStyle(),showPosts(),submitText();
} );


const btnAddImgLater = document.querySelector("#addLater");
const timing = document.querySelector(".loading-control-form");

btnAddImgLater.addEventListener( "click", () => {
  timing.style.display = "flex";
});


const output = document.querySelector("#volume");
const inputRange = document.querySelector("#counter");

inputRange.addEventListener( "input", () => {
  let vol = parseInt(inputRange.value);

  if (vol == 1) {
    output.innerHTML = `Через ${vol} секунду`;
      } else {
        output.innerHTML = `Через ${vol} секунд(ы)`;
      }
} );


const btnConfirm = document.querySelector(".control-form-btn");

btnConfirm.addEventListener( "click", () => {
  setTimeout( () => {
    addPhoto(),submitText(),showPosts();
  }, inputRange.value * 1000);
  
  timing.style.display = "none";
  
  cancelStyle();
} );


document.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if (!click.includes(btnAddImgLater) && !click.includes(timing)) {
    timing.style.display = "none";
  }
});


const modalPost = document.querySelector(".modal-profile-post");
const postImg = document.querySelector(".post-wrap-img");
const descriptionPhoto = document.querySelector(".post-description-story");
const likePhoto = document.querySelector(".post-description-like");
const sectionComments = document.querySelector(".post-description-section");

listPhoto.addEventListener( "click", (e) => {
  let attrId = e.target.parentElement.id;
  let indexObj = posts[attrId - 1];

  modalPost.id = indexObj.id;
  postImg.src = indexObj.src;
  likePhoto.innerHTML = `Нравится: ${indexObj.like}`;
  descriptionPhoto.innerHTML = `<b>${indexObj.userName}</b> ${indexObj.description}`;

  for (let key of indexObj.comments) {
    let newComment = `<p class="post-description-comment"><b>${key.userName}</b> ${key.comment}</p>`;
    sectionComments.insertAdjacentHTML("afterbegin", newComment);
  }

  modal.style.display = "flex";
  modalPost.style.display = "block";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  console.log(posts);
});


modal.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if ( !click.includes(popup) && !click.includes(modalPost) ) {
    cancelStyle();
    sectionComments.innerHTML = "";
  }
});


const btnLike = document.querySelector("#action-btn-heart");

btnLike.addEventListener( "click", (e) => {
  let attrId = e.target.closest(".modal-profile-post").id;
  let indexObj = posts[attrId - 1];
  let count = 1;

  indexObj.like = indexObj.like + count;
  likePhoto.innerHTML = `Нравится: ${indexObj.like}`;
} );


// const btnComment = document.querySelector("#action-btn-comment");
// const postBar = document.querySelector(".profile-post-description");;

// btnComment.addEventListener( "click", () => {
//   commentForm.style.display = "block";
// } );


// const commentForm = document.querySelector("#post-description-form");
// const btnCommentConfirm = document.querySelector(".post-description-btn");

// btnCommentConfirm.addEventListener( "click", (e) => {
//   let attrId = e.target.closest(".modal-profile-post").id;
//   let indexObj = posts[attrId - 1];

//   indexObj.comments = commentFormText.value; 

//   let newComment = `<p class="post-description-comment"><b>${indexObj.userName}</b> ${indexObj.comments}</p>`

//   commentForm.insertAdjacentHTML("beforebegin", newComment);

//   commentForm.style.display = "none";

//   commentFormText.value = "";
// } );

// const addComment = () => {
//   // let count = posts.length;
//   // count ++;

//   let newComment = {
//     id: 6,
//     userName: "Alex",
//     comment: "Wow"
//   };

//   posts.push(newComment);
// };