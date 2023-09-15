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
    //h3.style.display = "none";
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;

  //random btn chose
  let ranIdx = Math.floor(Math.random() * 3);
  let ranColor = btns[ranIdx];
  let ranBtn = document.querySelector(`.${ranColor}`);
  gameSeq.push(ranColor);
  btnFlash(ranBtn);
}

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}
function btnPress() {
  console.log(this);
  let btn = this;
  let userpresscolor = btn.getAttribute("id");
  userFlash(btn);
  userSeq.push(userpresscolor);
  chechAns(userSeq.length - 1);
  console.log(userpresscolor);
}
let allbtn = document.querySelectorAll(".dtn");
for (btnsingal of allbtn) {
  btnsingal.addEventListener("click", btnPress);
}
function chechAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 2000);
    }
  } else {
    h3.innerHTML = `Game Over  ! your score was <b>${level}</b> <br>press any key to Restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    reset();
  }
}
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
