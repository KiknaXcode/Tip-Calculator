let billInput = document.querySelector("#bill-input");
let peopleInput = document.querySelector("#number-people-input");
let tipAmount = document.querySelector("#tip-amount");
let tipTotal = document.querySelector("#tip-total");
// let tipPrectg = document.querySelector(".select-tip-part");
let selectBtns = document.querySelectorAll(".btn");
let customTip = document.getElementById("custom-input");
let resetBtn = document.querySelector(".reset");
let zeroWarning = document.getElementById("zero-warning");
let customDiv = document.getElementById("custom-div");

var tipValue = 15;
var newBillValue = 0;
var newPeopleValue = 1;
var newCustomValue = 0;

/* when we click reset button, all information
are going to set as default */

resetBtn.addEventListener("click", (event) => {
  billInput.value = "0";
  peopleInput.value = "1";
  tipAmount.innerHTML = "$0.00";
  tipTotal.innerHTML = "$0.00";
  customTip.value = "";
  billInput.style.border = "";
  zeroWarning.style.display = "none";
  peopleInput.style.border = "";
  customDiv.style.border = "";

  for (var i = 0; i < selectBtns.length; i++) {
    selectBtns[i].classList.remove("active");
  }

  selectBtns[2].classList.add("active");
});

// console.log(selectBtns)

/* first of all, u should recall that we have array when we calling
for selectBtns. that is why we need to get access on each kind
of element. for each one, we are getting function changeActiveStatus */

for (var i = 0; i < selectBtns.length; i++) {
  selectBtns[i].addEventListener("click", changeActiveStatus);
}

/* 
in function changeActiveStatus, we are tring to remove active class name
for each btn element and then add targeted button's className with "active".
Finally we are 
*/

function changeActiveStatus(event) {
  for (var i = 0; i < selectBtns.length; i++) {
    selectBtns[i].classList.remove("active");
  }
  event.target.classList.add("active");
  tipValue = event.target.value;
  console.log(tipValue);
}
// billInput.value = 0;  [i]
// peopleInput.value = 0;

billInput.addEventListener("input", changeInputValueBill);
peopleInput.addEventListener("input", changeInputValuePeople);
customTip.addEventListener("input", changeInputValueCustom);
// console.log(selectBtns);

// when value of bill input change, then we should
// created new value in JS for that change and we
// are gonna utilize this new value for formula of Tip.
// Same cases are changeInputValueBill()  and  changeInputValuePeople()

function changeInputValueBill() {
  billInput.style.border = "";
  newBillValue = billInput.value;
  // console.log(newBillValue);
  if (newBillValue > 100000) {
    billInput.style.border = "3px solid red";
    billInput.value = "100000";
  }

  if (newBillValue < 0) {
    billInput.style.border = "3px solid red";
    billInput.value = "0";
  }
}

function changeInputValuePeople() {
  zeroWarning.innerHTML = "";
  newPeopleValue = peopleInput.value;
  peopleInput.style.border = "";
  zeroWarning.style.display = "none";

  // onsole.log(newPeopleValue);
  if (newPeopleValue < 1) {
    peopleInput.value = "1";
  }

  if (newPeopleValue > 10000) {
    peopleInput.value = "10000";
    peopleInput.style.border = "3px solid red";
    zeroWarning.style.display = "inline";
    zeroWarning.innerHTML = "Too Much :) ";
  }
}

function changeInputValueCustom() {
  customDiv.style.border = "";
  newCustomValue = customTip.value;
  tipValue = +newCustomValue;

  if (tipValue > 100) {
    customTip.value = "100";
    customDiv.style.border = "3px solid red";
  }
  for (var i = 0; i < selectBtns.length; i++) {
    selectBtns[i].classList.remove("active");
  }

  calculateFinallyPer();
  calculateFinally();
}

function calculateFinallyPer() {
  if (
    tipValue > 0 &&
    tipValue <= 100 &&
    newBillValue > 0 &&
    newPeopleValue > 0
  ) {
    var divided = tipValue / 100;
    var tipAmountFinally = (newBillValue * divided) / newPeopleValue;
    // tipAmount.innerHTML = tipAmountFinally;
    tipAmount.innerHTML = "$ " + tipAmountFinally.toFixed(2);
  }
}

function calculateFinally() {
  if (
    tipValue > 0 &&
    tipValue <= 100 &&
    newBillValue > 0 &&
    newPeopleValue > 0
  ) {
    var tipTotalFinally = newBillValue * (tipValue / 100);
    tipTotal.innerHTML = "$ " + tipTotalFinally.toFixed(2);
  }
}

billInput.addEventListener("keyup", (event) => {
  calculateFinallyPer();
  calculateFinally();
});

peopleInput.addEventListener("keyup", (event) => {
  calculateFinally();
  calculateFinallyPer();
});
