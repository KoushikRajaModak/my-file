//let box = document.getElementsByClassName("box");
//let btn = document.getElementsByClassName("btn");
let btn = document.querySelector("button");
btn.addEventListener("click", function () {
  let btn1 = document.querySelectorAll("div");
  btn1[1].innerText = generatecolor();
  btn1[2].style.backgroundColor = generatecolor();
});
btn.addEventListener("mouseenter", function () {
  let btn1 = document.querySelectorAll("div");

  btn1[0].style.color = generatecolor();
});
// btn.addEventListener("click", function () {
//   document.getElementById("fill").innerHTML = "Hello World!";
// });
// console.dir(btn);
function generatecolor() {
  let r, g, b;
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
}
let btnt = document.querySelector("input");
btnt.addEventListener("keydown", function (e) {
  console.dir(e);
  console.dir(e.code);
  console.dir(e.key);
});
let btntt = document.querySelector("input");
btntt.addEventListener("keyup", function (e) {
  console.dir(e);
  console.dir(e.code);
  console.dir(e.key);
});
