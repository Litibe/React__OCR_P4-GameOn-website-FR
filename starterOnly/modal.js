// update TopNavBar with Responsive
function editNav() {
  var myTopnav = document.getElementById("myTopnav");
  if (myTopnav.className === "topnav") {
    myTopnav.className += " responsive";
  } else {
    myTopnav.className = "topnav";
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

/////// FUNCTION CHECK INPUT DATA ///////////
// Control Form Map
const controlForm = new Map();

// fct check value into input type=text with min 2 characters
function checkInputText(element) {
  if (element.value.length < 2) {
    dataError(element);
    element.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ " +
        element.previousElementSibling.innerText
    );
    controlForm.delete(element.name);
  } else if (
    // regex text with no integer but with accent into first name for exemple
    !/^[a-zéèçàö]{2,50}(-| )?([a-zéèçàö]{2,50})?$/i.test(element.value)
  ) {
    dataError(element);
    element.parentElement.setAttribute(
      "data-error",
      "Veuillez entrer uniquement du texte pour ce champ."
    );
    controlForm.delete(element.name);
  } else {
    dataChecked(element);
    // add into controlForm Map to future send data
    controlForm.set(element.name, element.value);
  }
}

// fct check value into input type="email"
function checkValueEmail(element) {
  // control data with regex mail
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

// check input data birthday
function checkDateBirthAdult(element) {
  // if input is not undefined
  if (element.value !== "") {
    let dateMaxAdult = new Date(maxDateAdult).getTime();
    let dateMinAdult = new Date(minDateAdult).getTime();
    let controlDateInput = new Date(element.value).getTime();
    // control if age of user is 18< age <90 years
    if (controlDateInput >= dateMaxAdult) {
      element.parentElement.setAttribute(
        "data-error",
        "Vous devez entrer votre date de naissance & être Majeur selon les conditions d'utilisation."
      );
      controlForm.delete(element.name);
      dataError(element);
    } else if (controlDateInput < dateMinAdult) {
      element.parentElement.setAttribute(
        "data-error",
        "Vous devez avoir moins de 90ans pour vous inscrire selon les conditions d'utilisation."
      );
      controlForm.delete(element.name);
      dataError(element);
    } else {
      dataChecked(element);
      controlForm.set(element.name, element.value);
    }
  } else {
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez entrer votre date de naissance"
    );
    dataError(element);
    controlForm.delete(element.name);
  }
}

// Check input number of round participation
function checkdataRange(element) {
  // if input is not undefined and only a digit/integer
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

// control if contract checkbox is checked
function checkBoxContract(element) {
  if (element.checked) {
    element.parentElement.lastElementChild.classList.remove("bg-error");
    element.parentElement.removeAttribute("data-error-visible");
    element.parentElement.removeAttribute("data-error");
    controlForm.set(element.name, element.checked);
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

// control if one button radio is checked for locations
function checkdataLocation(element) {
  let divChild = element.childNodes;
  let detectOneChecked = undefined;
  // iteration control if one button is checked between them
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

/////// FUNCTION SIGNAL TO USER IF DATA SUCCESS OR DATA ERROR ///////////
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
}

/////// FUNCTIONS CONTROL IF FORM IS VALID TO SEND ///////////

// Check if all input is validated
function checkForm(element) {
  let formDiv = document.querySelector("form[name='reserve']").childNodes;
  // iteration to launch function associed to control every input
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
        } else if (child.firstElementChild.name === "location") {
          checkdataLocation(child);
        } else if (
          child.firstElementChild !== undefined &&
          child.firstElementChild.name === "contract"
        ) {
          checkBoxContract(child.firstElementChild);
        }
      }
    }
  }
  // after every function check, check of controlForm Map contains all necessary data to send form
  if (controlForm.size < 7) {
    element.classList.add("btn-submit-disabled");
    element.parentElement.setAttribute("data-error-visible", "true");
    element.parentElement.setAttribute(
      "data-error",
      "Vous devez remplir tous les éléments : reste " +
        (7 - controlForm.size) +
        " à remplir !"
    );
    // disactivate button to unautorize submit (update propriety type submit => buttom)
    btnSubmit.setAttribute("type", "button");
  } else {
    element.classList.remove("btn-submit-disabled");
    element.parentElement.removeAttribute("data-error-visible");
    element.parentElement.removeAttribute("data-error");
    // activate button to autorize submit (update propriety type buttom => submit)
    btnSubmit.setAttribute("type", "submit");
  }
}

// EventListen if form completed, upgrade btn to submit, send data, and display ::after div modal
formDiv.addEventListener("submit", function (e) {
  e.preventDefault();
  btnSubmit.value = "Fermer";
  btnSubmit.setAttribute("type", "button");
  btnSubmit.removeAttribute("onmouseover");
  btnSubmit.addEventListener("click", exitModal);
  document.documentElement.style.setProperty("--modal-after-display", "flex");
  let inputCheckEvents = document.querySelector("input[name='events']");
  // integration into controlFormMaps value of input Event because it's not required and not in function checkForm
  controlForm.set(inputCheckEvents.name, inputCheckEvents.checked);
  const dataJsonAPI = Object.fromEntries(controlForm);
  // only to test or remplace by fetch API code
  console.log(dataJsonAPI);
});
