javascript: (function () {
  function F1(ele, val) {
    if (document.getElementById(ele) && val != "") {
      document.getElementById(ele).value = val + "";
    }
  }

  let month = 1;
  F1("amtISTAV1", 30 * month);
  F1("amtDAKSH1", 0.5 * month);
  F1("amtSANGA1", 0.5 * month);
  F1("amtRITWI1", 1 * month);
  document.getElementById("accept_chk").checked = true;
})();
