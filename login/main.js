// 코드 구현
const login_id = document.getElementById("input__id");
const login_pw = document.getElementById("input__pw");
const class_login = document.getElementById("log_btn");
const warning_word = document.getElementById("warning");

if(login_pw){
  login_pw.addEventListener('keyup', function(){
    var check = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(login_pw.value);
  
    if (check && login_id.value !== "") {
      activation_LoginBtn();
    } else {
      deActivation_LoginBtn();
    }
  })
}


function activation_LoginBtn() {
  class_login.style.color = "black";
  class_login.style.backgroundColor = "greenyellow";
  class_login.style.cursor = "pointer";
  warning_word.style.textIndent = "-9999px";
  class_login.addEventListener("click", open_arlert);
}

function deActivation_LoginBtn() {
  class_login.style.color = "rgb(82, 81, 81)";
  class_login.style.backgroundColor = "gray";
  class_login.style.cursor = "default";
  warning_word.style.textIndent = "0";
  class_login.addEventListener("click", function () {});
}

function open_arlert() {
  var check2 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(login_pw.value);

  if (check2 && login_id.value !== "") {
    var msg = login_id.value + "님 어서오세요";
    console.log(msg);
    alert(msg);
  }
}
