let gameSeq = [];
let userSeq = [];
let btns = ["blue", "orange", "yellow", "red"];

let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("game is started");
    levelUp();
  }
});

function levelUp() {
  level++;
  h3.innerText = `Level ${level}`;

  //random btn chose
  let ranIdx = Math.floor(Math.random() * 3);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  btnFlash(ranBtn);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 2000);
}
