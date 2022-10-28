"use strict";

const activeUser = JSON.parse( localStorage.getItem("activeUser") );
const userNameAvatar = document.querySelector(".section-control-title");
userNameAvatar.innerHTML = activeUser.login;


const userAvatar = document.querySelector(".avatar-wrap-img");
userAvatar.src = activeUser.avatar;


const listAccaunts = JSON.parse( localStorage.getItem("listAccaunts") );
const btnChangeAvatar = document.querySelector(".section-control-btn");
const uploaderImg = document.querySelector(".section-control-input");

function download(input) {
  let userFound = listAccaunts.find( el => el.id == activeUser.id);

  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    userFound.avatar = reader.result;
    activeUser.avatar = reader.result; 
  }

  localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
  localStorage.setItem( `activeUser`, JSON.stringify(activeUser) ); 
}


const settingForm = document.querySelector(".profile-settings");
const nameSurnameInput = document.querySelector("#nam-s");
const loginInput = document.querySelector("#login");
const urlInput = document.querySelector("#url");
const aboutInput = document.querySelector("#about-m-f");
const emailInput = document.querySelector("#email");
const phoneNumberInput = document.querySelector("#tel");
const genderInput = document.querySelector("#gender");

settingForm.addEventListener( "submit", () => {
  let userFound = listAccaunts.find( el => el.id == activeUser.id);

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

  let newEmail = emailInput.value;
  userFound.email = newEmail;
  activeUser.email = newEmail;

  let newPhoneNumber = phoneNumberInput.value;
  userFound.phoneNumber = newPhoneNumber;
  activeUser.phoneNumber = newPhoneNumber;

  let newGender = genderInput.value;
  userFound.gender = newGender;
  activeUser.gender = newGender;

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