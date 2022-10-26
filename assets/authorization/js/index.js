"use strict";

import {listAccaunts} from "./assets.js";


const loginInput = document.querySelector(".login");
const passwordInput = document.querySelector(".password");
const validationForm = document.querySelector(".authorization-form");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

validationForm.addEventListener( "submit", (e) => {
  if ( JSON.parse( localStorage.getItem("listAccaunts") ) == null ) {
    localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
  }

  let login = loginInput.value;
  let password = passwordInput.value;
  let accauntsStorage = JSON.parse( localStorage.getItem("listAccaunts") );

  let foundUser = accauntsStorage.find( (el) => el.login == login);

  if (login == "") {
    loginError.innerText = "Введите логин";

    loginError.classList.add("loginErrorShow");
    loginInput.classList.add("inputInvalid");

    e.preventDefault();
  } 
  else if (foundUser == undefined) {
    loginError.innerText = "Неверный логин";

    loginError.classList.add("loginErrorShow");
    loginInput.classList.add("inputInvalid");

    e.preventDefault();
  } 
  else if (password == "") {
    passwordError.innerText = "Введите пароль";

    passwordError.classList.add("passwordErrorShow");
    passwordInput.classList.add("inputInvalid");
    loginInput.classList.add("inputValid");

    e.preventDefault();
  } 
  else if (foundUser.password != password) {
    passwordError.innerText = "Неверный пароль";

    loginInput.classList.add("inputValid");
    passwordError.classList.add("passwordErrorShow");
    passwordInput.classList.add("inputInvalid");

    e.preventDefault();
  } 
  else {
    localStorage.removeItem("redirect");
  }
});


loginInput.oninput = () => {
  loginInput.classList.remove("inputInvalid");
  loginInput.classList.remove("inputValid");
  loginError.classList.remove("loginErrorShow");
};


passwordInput.oninput = () => {
  passwordInput.classList.remove("inputInvalid");
  passwordError.classList.remove("passwordErrorShow");
};