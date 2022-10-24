"use strict";

import {listUsers} from "./assets.js";


let searchInput = document.querySelector(".main-search-input");
let btnSearch = document.querySelector(".main-search-btn");

searchInput.addEventListener( "focus", () => {
  btnSearch.classList.add("main-search-btn-focus");
});


let searchList = document.querySelector(".search-list");

listUsers.map( (index) => {
  let userItem = `<li class="search-list-item">${index.login}</li>`;

  searchList.insertAdjacentHTML("afterbegin", userItem);
});

let listUsersItems = document.querySelectorAll(".search-list-item");

searchInput.oninput = () => {
  let val = searchInput.value.trim();

  if (val != "") {
    listUsersItems.forEach( (elem) => {
      if (elem.innerText.search(val) != -1) {
        elem.classList.add("search-list-item-show");
      } else {
        elem.classList.remove("search-list-item-show");
      }
    })
  } else {
    listUsersItems.forEach( (elem) => {
      elem.classList.remove("search-list-item-show");
    })
  }
};


document.addEventListener( "click", (e) => {
  let click = e.composedPath();

  if ( !click.includes(searchInput) && !click.includes(searchList) ) {
    btnSearch.classList.remove("main-search-btn-focus");
    searchInput.value = "";
    listUsersItems.forEach( (elem) => {
      elem.classList.remove("search-list-item-show");
    })
  }
});