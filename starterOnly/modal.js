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

// Control Form
let inputLastName = document.getElementById("last")
let inputFirstName = document.getElementById("first")
let inputEmail = document.getElementById("email")
let inputDate = document.getElementById("birthdate")
inputLastName.addEventListener("change", function () {
  checkInputText(this);
},)
inputFirstName.addEventListener("change", function () {
  checkInputText(this);
},)
inputEmail.addEventListener("change", function () {
  checkValueEmail(this);
},)
inputDate.addEventListener("change", function () {
  checkDateBirthAdult(this);
},)


function checkInputText(element){
  console.log(element.previousElementSibling.innerText, "change")

  if (element.value.length < 2 ){
    element.classList.add("bg-error")
    element.parentElement.setAttribute("data-error-visible", "true")
    element.parentElement.setAttribute("data-error", "Veuillez entrer 2 caractères ou plus pour le champ " + element.previousElementSibling.innerText)

  } else if (!/^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/i.test(element.value)) {
    element.classList.add("bg-error")
    element.parentElement.setAttribute("data-error-visible", "true")
    element.parentElement.setAttribute("data-error", "Veuillez entrer uniquement du texte pour ce champ.")

  }else {
    element.parentElement.setAttribute("data-error-visible", "false")
    element.classList.remove("bg-error")
  }
}
function checkValueEmail(element) {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.value)) {
    element.parentElement.setAttribute("data-error-visible", "true")
    element.classList.add("bg-error")
  } else {
    element.parentElement.setAttribute("data-error-visible", "false")
    element.classList.remove("bg-error")
  }
}

function checkDateBirthAdult(element) {
  let today = new Date();
  let minDateAdult = new Date();
  minDateAdult.setYear(today.getFullYear() - 18);
  let maxDateAdult = new Date();
  maxDateAdult.setYear(today.getFullYear() - 90);
  let controlDateInput = new Date(element.value).getTime()
  let DateMinAdult = new Date(minDateAdult).getTime()
  if (controlDateInput >= DateMinAdult){
    element.parentElement.setAttribute("data-error-visible", "true")
    element.parentElement.setAttribute("data-error", "Vous devez entrer votre date de naissance & être Majeur selon les conditions d'utilisation.")
    element.classList.add("bg-error")
  } else if (controlDateInput <= maxDateAdult){
    element.parentElement.setAttribute("data-error-visible", "true")
    element.parentElement.setAttribute("data-error", "Vous devez avoir moins de 90ans pour vous inscrire selon les conditions d'utilisation.")
    element.classList.add("bg-error")
  }else {
    element.parentElement.setAttribute("data-error-visible", "false")
    element.classList.remove("bg-error")
  }
}
