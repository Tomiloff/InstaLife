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

    localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
    localStorage.setItem( `activeUser`, JSON.stringify(activeUser) ); 
    window.location.reload();
  }
}


const nameSurnameInput = document.querySelector("#nam-s");
nameSurnameInput.value = activeUser.nameSurname;

const loginInput = document.querySelector("#login");
loginInput.value = activeUser.login;

const urlInput = document.querySelector("#url");
urlInput.value = activeUser.url;

const aboutInput = document.querySelector("#about-m-f");
aboutInput.value = activeUser.description;

const emailInput = document.querySelector("#email");
emailInput.value = activeUser.email;

const phoneNumberInput = document.querySelector("#tel");
phoneNumberInput.value = activeUser.phoneNumber;

const genderInput = document.querySelector("#gender");
genderInput.value = activeUser.gender;

const settingForm = document.querySelector(".profile-settings");

settingForm.addEventListener( "submit", () => {
  let userFound = listAccaunts.find( el => el.id == activeUser.id);

  let newNameSurname = nameSurnameInput.value.trim();
  userFound.nameSurname = newNameSurname;
  activeUser.nameSurname = newNameSurname;

  let newLogin = loginInput.value.trim();
  userFound.login = newLogin;
  activeUser.login = newLogin;

  let newUrl = urlInput.value.trim();
  userFound.url = newUrl;
  activeUser.url = newUrl;

  let newDescription = aboutInput.value.trim();
  userFound.description = newDescription;
  activeUser.description = newDescription;

  let newEmail = emailInput.value.trim();
  userFound.email = newEmail;
  activeUser.email = newEmail;

  let newPhoneNumber = phoneNumberInput.value.trim();
  userFound.phoneNumber = newPhoneNumber;
  activeUser.phoneNumber = newPhoneNumber;

  let newGender = genderInput.value.trim();
  userFound.gender = newGender;
  activeUser.gender = newGender;

  localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
  localStorage.setItem( `activeUser`, JSON.stringify(activeUser) );
});


const passwordInput = document.querySelector(".password-section-input");
passwordInput.value = activeUser.password;

const passwordForm = document.querySelector(".profile-password");

passwordForm.addEventListener( "submit", () => {
  let userFound = listAccaunts.find( el => el.password == activeUser.password);

  let newPassword = passwordInput.value;

  userFound.password = newPassword;
  activeUser.password = newPassword;

  localStorage.setItem( `listAccaunts`, JSON.stringify(listAccaunts) );
  localStorage.setItem( `activeUser`, JSON.stringify(activeUser) );
});