let speedTypingTestEle = document.getElementById("speedTypingTest");
let timerEle = document.getElementById("timer");
let quoteDisplayEle = document.getElementById("quoteDisplay");
let quoteInputEle = document.getElementById("quoteInput");
let resultEle = document.getElementById("result");
let submitBtnEle = document.getElementById("submitBtn");
let resetBtnEle = document.getElementById("resetBtn");
let spinnerEle = document.getElementById("spinner");
let completeSeconds;

let url = "https://apis.ccbp.in/random-quote";
let uniqueId;

function getPara() {
  spinnerEle.classList.remove("d-none");
  let option = {
    method: "GET",
  };
  fetch(url, option)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      spinnerEle.classList.add("d-none");
      console.log(jsonData);
      quoteDisplayEle.textContent = jsonData.content;
    });
}

function canclePrevipousTimer() {
  clearInterval(uniqueId);
}

function timerClock() {
  canclePrevipousTimer();
  let counter = 0;
  uniqueId = setInterval(function () {
    counter += 1;
    completeSeconds = counter;
    timerEle.textContent = counter + " seconds";
  }, 1000);
}

function resetTime() {
  canclePrevipousTimer();
  timerEle.textContent = "";
}

timerClock();
getPara();

resetBtnEle.addEventListener("click", function () {
  timerClock();
  getPara();
  quoteInputEle.value = "";
  resultEle.textContent = "";
});

submitBtnEle.addEventListener("click", function () {
  let userInput = quoteInputEle.value;
  console.log(userInput);
  let quoteText = quoteDisplayEle.textContent;
  console.log(quoteText);
  if (userInput === quoteText) {
    canclePrevipousTimer();
    resultEle.textContent = "You typed in " + completeSeconds + " seconds";
  } else {
    resultEle.textContent = "You type incorrect sentense";
  }
});
