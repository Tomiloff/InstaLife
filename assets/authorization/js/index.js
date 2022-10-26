"use strict";

import {listAccaunts} from "./assets.js";


const loginInput = document.querySelector(".login");
const passwordInput = document.querySelector(".password");
const validationForm = document.querySelector(".authorization-form");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

validationForm.addEventListener( "submit", (e) => {
  let login = loginInput.value;
  let password = passwordInput.value;

  let foundUser = listAccaunts.find( (el) => el.login == login);

  if (login == "") {
    loginError.innerText = "Введите логин";

    loginError.classList.add("loginErrorShow");

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