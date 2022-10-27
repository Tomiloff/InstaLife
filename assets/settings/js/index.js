"use strict";


const userNameAvatar = document.querySelector(".section-control-title");

userNameAvatar.innerHTML = getUserActive.login;


const settingForm = document.querySelector(".profile-settings");
const activeUser = JSON.parse( localStorage.getItem("activeUser") );
const nameSurnameInput = document.querySelector("#nam-s");
const listAccaunts = JSON.parse( localStorage.getItem("listAccaunts") );
const loginInput = document.querySelector("#login");
const urlInput = document.querySelector("#url");
const aboutInput = document.querySelector("#about-m-f");

settingForm.addEventListener( "submit", () => {
  let userFound = listAccaunts.find( el => el.nameSurname == activeUser.nameSurname);

  let newNameSurname = nameSurnameInput.value;
  userFound.nameSurname = newNameSurname;
  activeUser.nameSurname = newNameSurname;

  let newLogin = loginInput.value;
  userFound.login = newLogin;
  activeUser.login = newLogin;

  let newUrl = urlInput.value;
  userFound.url = newUrl;
  activeUser.url = newUrl;

  let newDescription = aboutInput.value;
  userFound.description = newDescription;
  activeUser.description = newDescription;

  localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
  localStorage.setItem( `activeUser`, JSON.stringify(activeUser) );
});


const passwordForm = document.querySelector(".profile-password");
const passwordInput = document.querySelector(".password-section-input");

passwordForm.addEventListener( "submit", () => {
  let userFound = listAccaunts.find( el => el.password == activeUser.password);

  let newPassword = passwordInput.value;

  userFound.password = newPassword;
  activeUser.password = newPassword;

  localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
  localStorage.setItem( `activeUser`, JSON.stringify(activeUser) );
});