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
  const userFound = listAccaunts.find( ({id}) => id === activeUser.id);

  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    userFound.avatar = reader.result;
    activeUser.avatar = reader.result;

    localStorage.setItem( 'listAccaunts', JSON.stringify(listAccaunts) );
    localStorage.setItem( 'activeUser', JSON.stringify(activeUser) ); 
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
  const userFound = listAccaunts.find( ({id}) => id === activeUser.id);

  const dataCollection = {
    nameSurname: nameSurnameInput.value.trim(),
          login: loginInput.value.trim(),
            url: urlInput.value.trim(),
    description: aboutInput.value.trim(),
          email: emailInput.value.trim(),
    phoneNumber: phoneNumberInput.value.trim(),
         gender: genderInput.value.trim()
  };
  
  Object.entries(dataCollection).forEach( (el) => {
    userFound[el[0]] = el[1];
    activeUser[el[0]] = el[1];
  });

  localStorage.setItem( 'listAccaunts', JSON.stringify(listAccaunts) );
  localStorage.setItem( 'activeUser', JSON.stringify(activeUser) );
});


const passwordInput = document.querySelector(".password-section-input");
passwordInput.value = activeUser.password;

const passwordForm = document.querySelector(".profile-password");

passwordForm.addEventListener( "submit", () => {
  const userFound = listAccaunts.find( ({password}) => password === activeUser.password);

  const newPassword = passwordInput.value;

  userFound.password = newPassword;
  activeUser.password = newPassword;

  localStorage.setItem( 'listAccaunts', JSON.stringify(listAccaunts) );
  localStorage.setItem( 'activeUser', JSON.stringify(activeUser) );
});