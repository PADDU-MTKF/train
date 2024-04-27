// function home_next() {
//   let tno = document.getElementById("tno").value;
//   if (tno != "") {
//     localStorage.setItem("train_no", tno.toString());
//   }
// }

const btn_sub = document.getElementById("hnext");
const tno_text = document.getElementById("tno");
console.log("home");
// location.reload();
tno_text.addEventListener("keyup", (e) => {
  const value = e.currentTarget.value;
  if (value == "") {
    btn_sub.disabled = true;
  } else {
    btn_sub.disabled = false;
  }
});

const log_list = document.getElementById("drop_no");

if (localStorage.getItem("train_no")) {
  let temp = localStorage.getItem("train_no").split(",");
  let opt;
  for (let i = 0; i < temp.length; i++) {
    opt = document.createElement("option");
    opt.setAttribute("value", temp[i]);
    opt.textContent = temp[i];
    log_list.appendChild(opt);
  }
} else {
  console.log("out");
}

log_list.addEventListener("change", () => {
  if (log_list.value) {
    if (log_list.value == "null") {
      tno_text.value = "";
      btn_sub.disabled = true;
    } else {
      tno_text.value = log_list.value;
      btn_sub.disabled = false;
    }
  } else {
    btn_sub.disabled = true;
  }
});


// clearing the localstorage

function empty(){
  localStorage.clear();
}