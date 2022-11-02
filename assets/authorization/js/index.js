"use strict";

import {listAccaunts} from "./assets.js";

if ( !JSON.parse( localStorage.getItem("listAccaunts") ) ) {
  localStorage.setItem( 'listAccaunts', JSON.stringify(listAccaunts) );
}


const loginInput = document.querySelector(".login");
const passwordInput = document.querySelector(".password");
const validationForm = document.querySelector(".authorization-form");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

const handlingLogin = (e) => {
  loginError.classList.add("loginErrorShow");
  loginInput.classList.add("inputInvalid");

  e.preventDefault();
};

const handlingPassword = (e) => {
  loginInput.classList.add("inputValid");
  passwordError.classList.add("passwordErrorShow");
  passwordInput.classList.add("inputInvalid");

  e.preventDefault();
};

validationForm.addEventListener( "submit", (e) => {
  const loginUser = loginInput.value.trim();
  const password = passwordInput.value.trim();
  const accauntsStorage = JSON.parse( localStorage.getItem("listAccaunts") );

  const foundUser = accauntsStorage.find( ({login}) => login === loginUser);

  if (!loginUser) {
    loginError.innerText = "Введите логин";

    handlingLogin(e);
  } 
  else if (!foundUser) {
    loginError.innerText = "Неверный логин";

    handlingLogin(e);
  } 
  else if (!password) {
    passwordError.innerText = "Введите пароль";

    handlingPassword(e);
  } 
  else if (foundUser.password !== password) {
    passwordError.innerText = "Неверный пароль";

    handlingPassword(e);
  } 
  else {
    const activeUser = {
      id: foundUser.id,
      login: foundUser.login,
      password: foundUser.password,
      nameSurname: foundUser.nameSurname,
      url: foundUser.url,
      description: foundUser.description,
      email: foundUser.email,
      phoneNumber: foundUser.phoneNumber,
      gender: foundUser.gender,
      avatar: foundUser.avatar,
      publications: foundUser.publications
    };

    localStorage.setItem( 'activeUser', JSON.stringify(activeUser) );
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