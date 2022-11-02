"use strict";

import {listUsers} from "./assets.js";


const searchInput = document.querySelector(".main-search-input");
const btnSearch = document.querySelector(".main-search-btn");

searchInput.addEventListener( "focus", () => {
  btnSearch.classList.add("main-search-btn-focus");
});


const searchList = document.querySelector(".search-list");

listUsers.map( ({login}) => {
  const userItem = `<li class="search-list-item">${login}</li>`;

  searchList.insertAdjacentHTML("afterbegin", userItem);
});

const listUsersItems = document.querySelectorAll(".search-list-item");
const selectorItemShow = "search-list-item-show";

searchInput.oninput = () => {
  const val = searchInput.value.trim().toLowerCase();

  listUsersItems.forEach( (el) => {
    if (el.innerText.toLowerCase().search(val) !== -1) {
      el.classList.add(selectorItemShow);
    } else {
      el.classList.remove(selectorItemShow);
    }
  })
};


document.addEventListener( "click", (e) => {
  const click = e.composedPath();

  if ( !click.includes(searchInput) && !click.includes(searchList) ) {
    btnSearch.classList.remove("main-search-btn-focus");
    searchInput.value = "";
    listUsersItems.forEach( (el) => {
      el.classList.remove(selectorItemShow);
    })
  }
});