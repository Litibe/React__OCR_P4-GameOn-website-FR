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
const btnSubmit = document.getElementsByClassName("btn-submit")[0];
let formDiv = document.querySelector("form[name='reserve']");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// exit modal form
modalBtnSubmit.forEach((btn) => btn.addEventListener("click", exitModal));
function exitModal() {
  modalContent.style.animationName = "modalclose";
  setTimeout(function () {
    modalbg.style.display = "none";
    modalContent.style.animationName = "modalopen";
  }, 500);
}

// Control Form
const controlForm = new Map();
let inputLastName = document.getElementById("last");
let inputFirstName = document.getElementById("first");
let inputEmail = document.getElementById("email");
let inputDate = document.getElementById("birthdate");
let inputNumberRound = document.getElementById("quantity");

inputLastName.addEventListener("change", function () {
  checkInputText(this);
});
inputFirstName.addEventListener("change", function () {
  checkInputText(this);
});
inputEmail.addEventListener("change", function () {
  checkValueEmail(this);
});
inputDate.addEventListener("change", function () {
  checkDateBirthAdult(this);
});
inputNumberRound.addEventListener("change", function () {
  checkdataRange(this);
});

function checkInputText(element) {
  if (element.value.length < 2) {
    dataError(element);
    element.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ " +
        element.previousElementSibling.innerText
    );
  } else if (
    !/^[a-zéèçà]{2,50}(-| )?([a-zéèçà]{2,50})?$/i.test(element.value)
  ) {
    dataError(element);
    element.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer uniquement du texte pour ce champ."
    );
  } else {
    dataChecked(element);
    controlForm.set(element.previousElementSibling.innerText, element.value);
  }
}

function checkValueEmail(element) {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(element.value)) {
    dataError(element);
    controlForm.delete(element.name);
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez saisir une adresse mail valide."
    );
  } else {
    dataChecked(element);
    controlForm.set(element.name, element.value);
  }
}
// search today date, set min date and max date into form birthday (18-90years)
let today = new Date();
let maxDateAdult = new Date();
maxDateAdult.setYear(today.getFullYear() - 18);
let minDateAdult = new Date();
minDateAdult.setYear(today.getFullYear() - 90);
let dateMinInput = String(minDateAdult.toISOString().split("T")[0]);
let dateMaxInput = String(maxDateAdult.toISOString().split("T")[0]);
let inputBirthday = document.getElementById("birthdate");
inputBirthday.setAttribute("min", dateMinInput);
inputBirthday.setAttribute("max", dateMaxInput);

function checkDateBirthAdult(element) {
  if (element.value !== "") {
    let dateMaxAdult = new Date(maxDateAdult).getTime();
    let dateMinAdult = new Date(minDateAdult).getTime();
    let controlDateInput = new Date(element.value).getTime();
    if (controlDateInput >= dateMaxAdult) {
      element.parentElement.setAttribute(
        "data-error",
        "Vous devez entrer votre date de naissance & être Majeur selon les conditions d'utilisation."
      );
      dataError(element);
    } else if (controlDateInput < dateMinAdult) {
      element.parentElement.setAttribute(
        "data-error",
        "Vous devez avoir moins de 90ans pour vous inscrire selon les conditions d'utilisation."
      );
      dataError(element);
    } else {
      dataChecked(element);
      controlForm.set(element.previousElementSibling.innerText, element.value);
    }
  } else {
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance"
    );
    dataError(element);
  }
}

function checkdataRange(element) {
  if (element.value < "0" || !/\d$/i.test(element.value)) {
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez saisir un chiffre"
    );
    dataError(element);
    controlForm.delete(element.name);
  } else {
    dataChecked(element);
    controlForm.set(element.name, element.value);
  }
}

// set green background and clean attribute data-error
function dataChecked(element) {
  element.classList.remove("bg-error");
  element.classList.add("bg-checked");
  element.parentElement.removeAttribute("data-error-visible");
  element.parentElement.removeAttribute("data-error");
}

//set red background  and set attribute data-error
function dataError(element) {
  element.parentElement.setAttribute("data-error-visible", "true");
  element.classList.add("bg-error");
  element.classList.remove("bg-checked");
  controlForm.delete(element.previousElementSibling.innerText);
}

function checkBoxContract(element) {
  if (element.checked) {
    element.parentElement.lastElementChild.classList.remove("bg-error");
    element.parentElement.removeAttribute("data-error-visible");
    element.parentElement.removeAttribute("data-error");
    controlForm.set(element.name, element.value);
  } else {
    element.parentElement.lastElementChild.classList.add("bg-error");
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez accepter les conditions d'utilisation."
    );
    element.parentElement.setAttribute("data-error-visible", true);
    controlForm.delete(element.name);
  }
}

function checkdataLocation(element) {
  let divChild = element.childNodes;
  let detectOneChecked = undefined;
  for (const child of divChild) {
    if (child.checked === true) {
      detectOneChecked = child;
      element.classList.remove("bg-error");
      element.removeAttribute("data-error-visible");
      element.removeAttribute("data-error");
      controlForm.set(child.name, child.value);
    }
  }
  if (detectOneChecked === undefined) {
    element.classList.add("bg-error");
    element.setAttribute("data-error", "Vous devez cocher une ville.");
    element.setAttribute("data-error-visible", true);
  }
}

// Check if all input is validated
function checkForm(element) {
  let formDiv = document.querySelector("form[name='reserve']").childNodes;
  for (const child of formDiv) {
    if (child.attributes !== undefined) {
      if (child.attributes.class.nodeValue === "formData") {
        // in form, select only div class=formDATA
        if (
          child.lastElementChild !== undefined &&
          child.lastElementChild.name !== undefined
        ) {
          if (
            child.lastElementChild.name === "last" ||
            child.lastElementChild.name === "first"
          ) {
            checkInputText(child.lastElementChild);
          } else if (child.lastElementChild.name === "email") {
            checkValueEmail(child.lastElementChild);
          } else if (child.lastElementChild.name === "birthdate") {
            checkDateBirthAdult(child.lastElementChild);
          } else if (child.lastElementChild.name === "quantity") {
            checkdataRange(child.lastElementChild);
          }
        } else if (
          child.firstElementChild !== undefined &&
          child.firstElementChild.name === "contract"
        ) {
          checkBoxContract(child.firstElementChild);
        } else if (child.firstElementChild.name === "location") {
          checkdataLocation(child);
        }
      }
    }
  }
  if (controlForm.size < 7) {
    element.style.background = "gray";
    element.parentElement.setAttribute("data-error-visible", "true");
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez remplir tous les éléments : reste " +
        (7 - controlForm.size) +
        " à remplir !"
    );
  } else {
    element.style.background = "red";
    element.parentElement.removeAttribute("data-error-visible");
    element.parentElement.removeAttribute("data-error");
    btnSubmit.setAttribute("type", "submit");
  }
  data = "Données envoyées par le formulaire : ";
  for (const child of controlForm) {
    data += Object.values(child);
    data += "##";
  }
}
// if form completed, upgrade btn to submit, send data, and display ::after div modal
formDiv.addEventListener("submit", function (e) {
  e.preventDefault();
  btnSubmit.value = "Fermer";
  btnSubmit.setAttribute("type", "button");
  btnSubmit.removeAttribute("onmouseover");
  btnSubmit.addEventListener("click", exitModal);
  document.documentElement.style.setProperty("--modal-after-display", "flex");
  alert(data);
});
