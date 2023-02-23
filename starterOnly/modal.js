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
const controlForm = new Map();

let inputLastName = document.getElementById("last")
let inputFirstName = document.getElementById("first")
let inputEmail = document.getElementById("email")
let inputDate = document.getElementById("birthdate")
let inputNumberRound = document.getElementById("quantity")

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
inputNumberRound.addEventListener("change", function () {
  console.log(this);
},)

function checkInputText(element){
  if (element.value.length < 2 ){
    dataError(element)
    element.parentElement.setAttribute(
      "data-error", "Veuillez entrer 2 caractères ou plus pour le champ " + element.previousElementSibling.innerText)
  } else if (!/^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/i.test(element.value)) {
    dataError(element)
   element.parentElement.setAttribute("data-error", "Veuillez entrer uniquement du texte pour ce champ.")
  }else {
    dataChecked(element)
  }
}

function checkValueEmail(element) {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.value)) {
    dataError(element)
    element.parentElement.setAttribute("data-error", "Vous devez saisir une adresse mail valide.")
  } else {
    dataChecked(element)
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
    element.parentElement.setAttribute(
      "data-error", "Vous devez entrer votre date de naissance & être Majeur selon les conditions d'utilisation.")
    dataError(element)
  } else if (controlDateInput <= maxDateAdult){
    element.parentElement.setAttribute(
      "data-error", "Vous devez avoir moins de 90ans pour vous inscrire selon les conditions d'utilisation.")
    dataError(element)
  } else {
    dataChecked(element)
  }
}

function dataChecked(element){
  element.classList.remove("bg-error")
  element.classList.add("bg-checked")
  element.parentElement.removeAttribute("data-error-visible"),
  element.parentElement.removeAttribute("data-error")
  controlForm.set(element.previousElementSibling.innerText, element.value)
}

function dataError(element){
  element.parentElement.setAttribute("data-error-visible", "true")
  element.classList.add("bg-error")
  element.classList.remove("bg-checked")
  controlForm.delete(element.previousElementSibling.innerText)
}

function checkBox(element){
  if (element.checked){
  controlForm.set(element.name, element.value)} else {
    controlForm.delete(element.name)}
}

function checkForm(element){
  console.log(controlForm)
  if (controlForm.size <1 ){
  element.parentElement.setAttribute("data-error-visible", "true")
  element.parentElement.setAttribute(
    "data-error", "Vous devez remplir tous les éléments : reste " + (7 - controlForm.size) + " à remplir !")
  } else{
    element.parentElement.removeAttribute("data-error-visible"),
    element.parentElement.removeAttribute("data-error")
    element.removeAttribute("disabled")
  }
}
controlForm.addEventListener("change", function() {checkForm()})
