$(document).ready(function () {
const MainTime = 10;
let time = MainTime;
const radios = document.querySelectorAll('input[type="radio"]');

radios.forEach((radio) => {
    radio.addEventListener("change", () => {
        for (let i = 1; i <= radios.length; i++) {
            let selectedDiv = document.querySelector(`.slide_content_${i}`);
            selectedDiv.style.display = "none";
        }
        let selectedDiv = document.querySelector(
            `.slide_content_${radio.value}`
        );
        const element = document.querySelector(".slide_content_1");
        element.style.animation = "none";
        selectedDiv.style.display = "block";
        setTimeout(function () {
            for (let i = 1; i <= radios.length; i++) {
                let selectedDiv = document.querySelector(`.slide_content_${i}`);
                selectedDiv.style.display = "block";
            }

            const updatedKeyframesRule =
                radio.value == 1
                    ? ` @keyframes example {
                  0% {
          margin-top: 0px;
        }
        10% {
          margin-top: -450px;
        }
        45% {
          margin-top: -450px;
        }
        50% {
          margin-top: -900px;
        }
        70% {
          margin-top: -900px;
        }
        75% {
          margin-top: -1350px;
        }

        99.99% {
          margin-top: -1350px;
        }
        100% {
          margin-top: 0px;
        }
      }${(time = (MainTime / 4) * 1)}`
                    : radio.value == 2
                        ? ` @keyframes example {
                  0% {
          margin-top: -450px;
        }          
        20% {
          margin-top: -900px;
        }
        70% {
          margin-top: -900px;
        }
        75% {
          margin-top: -1350px;
        }

        99.99% {
          margin-top: -1350px;
        }
        100% {
          margin-top: 0px;
        }
      }${(time = (MainTime / 4) * 2)}`
                        : radio.value == 3
                            ? ` @keyframes example {
                  0% {
          margin-top: -900px;
        }
      20% {
          margin-top: -1350px;
        }

        99.99% {
          margin-top: -1350px;
        }
        100% {
          margin-top: 0px;
        }
      }${(time = (MainTime / 4) * 3)}`
                            : ` @keyframes example {
        0% {
          margin-top: 0px;
        }
        20% {
          margin-top: 0px;
        }
        25% {
          margin-top: -450px;
        }
        45% {
          margin-top: -450px;
        }
        50% {
          margin-top: -900px;
        }
        70% {
          margin-top: -900px;
        }
        75% {
          margin-top: -1350px;
        }

        99.99% {
          margin-top: -1350px;
        }
        100% {
          margin-top: 0px;
        }
      }${(time = 0)}`;
            element.style.animation = `example ${MainTime - time
                }s linear infinite`;
            let keyframesStyle = document.getElementById("keyframesStyle");
            keyframesStyle.textContent = updatedKeyframesRule;

            setTimeout(function () {
                element.style.animation = "none";
            }, (MainTime - time) * 1000);
            setTimeout(function () {
                keyframesStyle.textContent = `
                @keyframes example {
        0% {
          margin-top: 0px;
        }
        20% {
          margin-top: 0px;
        }
        25% {
          margin-top: -450px;
        }
        45% {
          margin-top: -450px;
        }
        50% {
          margin-top: -900px;
        }
        70% {
          margin-top: -900px;
        }
        75% {
          margin-top: -1350px;
        }

        99.99% {
          margin-top: -1350px;
        }
        100% {
          margin-top: 0px;
        }
      }`;
                element.style.animation = `example ${MainTime}s linear infinite`;
                console.log("in");
                document.getElementById(`radio${radio.value}`).checked = false;
            }, (MainTime - time + 2) * 1000);
            console.log("out");
        }, 5000);
    });
});
});