function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnSubmit = document.querySelectorAll(".close");
const modalContent = document.getElementsByClassName("content")[0];


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// exit modal form
modalBtnSubmit.forEach((btn) => btn.addEventListener("click", exitModal))
function exitModal() {
  modalContent.style.animationName = "modalclose";
  setTimeout(function() {
    modalbg.style.display = "none";
    modalContent.style.animationName = "modalopen";
  }, 500);
  
}

