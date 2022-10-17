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


const posts = [
  {
    id: 1, 
    login: 'name', 
    description: 'Картина дерева', 
    src: '../assets/profile/images/img-content-1.jpg',
    like: 18
  },
  {
    id: 2, 
    login: 'name', 
    description: 'В мире животных', 
    src: '../assets/profile/images/img-content-2.jpg',
    like: 5
  },
  {
    id: 3, 
    login: 'name', 
    description: 'Невероятная архитектура здания Венгерского парламента', 
    src: '../assets/profile/images/img-content-3.jpg',
    like: 10
  },
  {
    id: 4, 
    login: 'name', 
    description: 'Клубничный торт на Ваш праздник', 
    src: '../assets/profile/images/img-content-4.jpg',
    like: 69
  },
  {
    id: 5, 
    login: 'name', 
    description: 'Всё для сада и огорода', 
    src: '../assets/profile/images/img-content-5.jpeg',
    like: 34
  },
  {
    id: 6, 
    login: 'name', 
    description: 'Силуэт дерева с раскидистой кроной и с солнцем по центру', 
    src: '../assets/profile/images/img-content-6.jpg',
    like: 78
  },
];


const listPhoto = document.querySelector(".page-profile-content");

const showPosts = () => {
  listPhoto.innerHTML = "";

  let count = 1;

  posts.map( (index) => {
    let newPhoto = `<div id="${count}" class="profile-content-wrap">
                    <img src="${index.src}" 
                    alt="Фото-публикация"></div>`;

    count++;

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
    login: "name", 
    description: "", 
    src: imgWrap.src,
    like: 0
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

const outputUpdate = (vol) => {
  if (vol == 1) {
    output.value = `Через ${vol} секунду`;
  } else {
    output.value = `Через ${vol} секунд(ы)`;
  }
};


const btnConfirm = document.querySelector(".control-form-btn");
const inputRange = document.querySelector("#counter");

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
const commentPhoto = document.querySelector(".post-description-story");
const likePhoto = document.querySelector(".post-description-like");

listPhoto.addEventListener( "click", (e) => {
  let attrId = e.target.parentElement.id;
  let indexObj = posts[attrId - 1];

  modalPost.id = indexObj.id;
  postImg.src = indexObj.src;
  commentPhoto.innerHTML = `<b>${indexObj.login}</b> ${indexObj.description}`;
  likePhoto.innerHTML = `Нравится: ${indexObj.like}`;


  modal.style.display = "flex";
  modalPost.style.display = "flex";
  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
});


modal.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if ( !click.includes(popup) && !click.includes(modalPost) ) {
    cancelStyle();
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