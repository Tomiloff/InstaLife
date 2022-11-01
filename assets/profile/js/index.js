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
      document.querySelector(".clock").innerHTML = clock;
      document.querySelector(".clock-mobile").innerHTML = clock;
    });
  };
};

showTime();


import {posts} from "./assets.js";

if ( !JSON.parse( localStorage.getItem("posts") ) ) {
  localStorage.setItem( 'posts', JSON.stringify(posts) );
}


const listPhoto = document.querySelector(".page-profile-content");

const showPosts = () => {
  listPhoto.innerHTML = "";

  const postsStorage = JSON.parse(localStorage.getItem("posts"));

  postsStorage.map( (index) => {
    const newPhoto = `<div id="${index.id}" class="profile-content-wrap">
                      <img src="${index.src}" alt="Фото-публикация">
                    </div>`;

    listPhoto.insertAdjacentHTML("afterbegin", newPhoto);
  } );
};

showPosts();


const imgWrap = document.querySelector(".loading-wrap-img");
const url = "http://aws.random.cat/meow";

async function fetchImage() {
  try {
    const promise = await fetch(url);
    const data = await promise.json();
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


const statisticPosts = document.querySelector(".statistic-publications");

const countPublications = () => {
  const listAccaunts = JSON.parse( localStorage.getItem("listAccaunts") );
  const activeUser = JSON.parse( localStorage.getItem("activeUser") );
  const listPosts = JSON.parse( localStorage.getItem("posts") ); 

  const userFound = listAccaunts.find( el => el.id === activeUser.id);

  const countPosts = listPosts.length;

  userFound.publications = countPosts;
  activeUser.publications = countPosts;
  statisticPosts.innerHTML = activeUser.publications;

  localStorage.setItem( 'listAccaunts', JSON.stringify(listAccaunts) );
  localStorage.setItem( 'activeUser', JSON.stringify(activeUser) ); 
};

countPublications();


const addPhoto = () => {
  const listPosts = JSON.parse( localStorage.getItem("posts") ); 
  let count = listPosts.length;
  count ++;

  const newPost = {
    id: count,  
    description: "", 
    src: imgWrap.src,
    like: 0,
    myLike: 0,
    comments: []
  };

  listPosts.push(newPost);
  localStorage.setItem( 'posts', JSON.stringify(listPosts) );
  countPublications();
};


const inputTextForm = document.querySelector(".loading-control-comment");

const submitText = () => {
  const listPosts = JSON.parse( localStorage.getItem("posts") );
  listPosts[listPosts.length - 1].description = inputTextForm.value.trim();

  localStorage.setItem( 'posts', JSON.stringify(listPosts) );

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
  const vol = parseInt(inputRange.value);

  output.innerHTML = `Через ${vol === 1 ? 
    `${vol} секунду` : `${vol} секунд(ы)`}`;
} );


const btnConfirm = document.querySelector(".control-form-btn");

btnConfirm.addEventListener( "click", () => {
  setTimeout( () => {!
    addPhoto(),submitText(),showPosts();
  }, inputRange.value * 1000);
  
  timing.style.display = "none";
  
  cancelStyle();
} );


document.addEventListener( "click", (e) => {
  const click = e.composedPath();

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
  const listPosts = JSON.parse( localStorage.getItem("posts") );
  const attrId = e.target.parentElement.id;
  const indexObj = listPosts[attrId - 1];
  const activeUser = JSON.parse( localStorage.getItem("activeUser") );

  modalPost.id = indexObj.id;
  postImg.src = indexObj.src;
  likePhoto.innerHTML = `Нравится: ${indexObj.like}`;

  if (indexObj.description === "") {
    descriptionPhoto.classList.add("post-description-story-hide");
  } else {
    descriptionPhoto.classList.remove("post-description-story-hide");
    descriptionPhoto.innerHTML = `<b>${activeUser.login}</b> ${indexObj.description}`;
  }

  indexObj.comments.forEach( (el) => {
    const newComment = `<p class="post-description-comment">
                        <b>${el.userName}</b> ${el.comment}
                      </p>`;
                      
    sectionComments.insertAdjacentHTML("afterbegin", newComment);
  });

  modal.style.display = "flex";
  modalPost.style.display = "block";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
});


const btnLike = document.querySelector("#action-btn-heart");

btnLike.addEventListener( "click", (e) => {
  const listPosts = JSON.parse( localStorage.getItem("posts") );
  const attrId = e.target.closest(".modal-profile-post").id;
  const indexObj = listPosts[attrId - 1];
  const count = 1;

  if (indexObj.myLike === 0) {
    indexObj.myLike = count;
    indexObj.like = indexObj.like + count;
  
    likePhoto.innerHTML = `Нравится: ${indexObj.like}`;
  
    localStorage.setItem( 'posts', JSON.stringify(listPosts) );
  } 
} );


const btnComment = document.querySelector("#action-btn-comment");
const commentForm = document.querySelector(".post-description-form");

btnComment.addEventListener( "click", () => {
  commentForm.style.display = "flex";

  const height = modalPost.scrollHeight;
  modalPost.scrollTo({
    top: height,
    behavior: "smooth"
});
} );


const textComment = document.querySelector(".post-description-textarea");
const btnCommentConfirm = document.querySelector(".post-description-btn");

btnCommentConfirm.addEventListener( "click", (e) => {
  const listPosts = JSON.parse( localStorage.getItem("posts") );
  const attrId = e.target.closest(".modal-profile-post").id;
  const indexObj = listPosts[attrId - 1].comments;
  const newTextComment = textComment.value.trim();
  const activeUser = JSON.parse( localStorage.getItem("activeUser") );

  if (newTextComment === "") {
    commentForm.style.display = "none";
    textComment.value = "";
  } else {
    let count = indexObj.length;
    count ++;

    const newObjComment = {
    id: count,
    userName: activeUser.login,
    comment: newTextComment
    };
    
    indexObj.push(newObjComment);
  
    const newComment = `<p class="post-description-comment">
                      <b>${activeUser.login}</b> ${newTextComment}
                      </p>`;
  
    sectionComments.insertAdjacentHTML("afterbegin", newComment);
  
    commentForm.style.display = "none";
    textComment.value = "";
  
    localStorage.setItem( 'posts', JSON.stringify(listPosts) );
  }
});


modal.addEventListener( "click", (e) => {
  const click = e.composedPath();

  if ( !click.includes(popup) && !click.includes(modalPost) ) {
    cancelStyle();
    sectionComments.innerHTML = "";
    commentForm.style.display = "none";
    textComment.value = "";
  }
});


const activeUser = JSON.parse( localStorage.getItem("activeUser") );
const userName = document.querySelector(".description-name-title");

userName.innerHTML = activeUser.login;
statisticPosts.innerHTML = activeUser.publications;


const nameSurname = document.querySelectorAll(".description-aside-title");
nameSurname.forEach( el => {
  el.innerHTML = activeUser.nameSurname;
});


const urlUser = document.querySelectorAll(".description-aside-link");
urlUser.forEach( el => {
  el.innerHTML = activeUser.url;
});


const aboutUser = document.querySelectorAll(".aside-title-about");
aboutUser.forEach( el => {
  el.innerHTML = activeUser.description;
});


const userAvatar = document.querySelector(".info-avatar-img");
userAvatar.src = activeUser.avatar;