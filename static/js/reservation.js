let info_logo = document.getElementById("info_logo");
let details = document.getElementsByClassName("details")[0];
let coch = document.getElementsByClassName("coach")[0];
let flag = 0;
info_logo.style.background = " rgb(236, 38, 38)";

function display_details() {
  if (flag == 0) {
    flag = 1;
    info_logo.style.background = "rgb(6, 249, 6)";
    let create_details = document.createElement("img");
    create_details.setAttribute("id", "create_details");
    create_details.setAttribute("class", "details_img");
    create_details.setAttribute("src", det_img);
    details.appendChild(create_details);
  } else {
    flag = 0;

    info_logo.style.background = " rgb(236, 38, 38)";
    console.log("hello");
    let crtdetls = document.getElementById("create_details");
    crtdetls.remove();
  }
}

info_logo.addEventListener("click", display_details);

//*********************** */
let sb_details = document.getElementById("sb_details");

function save_status() {
  let key = tno.toString() + "___" + coach_drop.value + "___" + cno_drop.value;

  let data;
  try {
    data = JSON.parse(localStorage.getItem(key));
    console.log("heeeeere");
  } catch {
    console.log("return");
    return;
  }

  for (let j = 0; j < Object.keys(data).length; j++) {
    let ele = document.getElementById("drop" + j);
    data[j][3] = ele.value;
  }

  localStorage.setItem(key, JSON.stringify(data));
}

function add_sb_details(key) {
  let data = {};
  sb_details.innerHTML = "";
  try {
    data = JSON.parse(localStorage.getItem(key));
    console.log("heeeeere");
  } catch {
    console.log("return");
    return;
  }
  for (let j = 0; j < Object.keys(data).length; j++) {
    let temp = data[j];
    let sb_dtls = document.createElement("div");
    sb_dtls.setAttribute("class", "outline_div");
    for (let i = 0; i < 3; i++) {
      let txt_dtls = document.createElement("input");
      txt_dtls.setAttribute("class", "txtdls");
      txt_dtls.setAttribute("type", "text");
      txt_dtls.setAttribute("value", temp[i]);

      sb_dtls.appendChild(txt_dtls);
    }
    //*********** creating drop down list in reservation chart**************************/
    let drop_down = document.createElement("select");
    drop_down.setAttribute("class", "drop");
    drop_down.setAttribute("id", "drop" + j);

    let opt0 = document.createElement("option");
    opt0.setAttribute("value", "");
    opt0.textContent = "select";

    let opt1 = document.createElement("option");
    opt1.setAttribute("value", "canceled");
    opt1.textContent = "canceled";

    let opt2 = document.createElement("option");
    opt2.setAttribute("value", "RAC");
    opt2.textContent = "RAC";

    let opt3 = document.createElement("option");
    opt3.setAttribute("value", "Not Checked");
    opt3.textContent = "Not Checked";

    let opt4 = document.createElement("option");
    opt4.setAttribute("value", "Checked");
    opt4.textContent = "Checked";

    let opt5 = document.createElement("option");
    opt5.setAttribute("value", "Rac Cleared");
    opt5.textContent = "Rac Cleared";

    let opt6 = document.createElement("option");
    opt6.setAttribute("value", "To Be Checked");
    opt6.textContent = "To Be Checked";

    let opt7 = document.createElement("option");
    opt7.setAttribute("value", "Not Joined");
    opt7.textContent = "Not Joined";

    drop_down.appendChild(opt0);
    drop_down.appendChild(opt1);
    drop_down.appendChild(opt2);
    drop_down.appendChild(opt3);
    drop_down.appendChild(opt4);
    drop_down.appendChild(opt5);
    drop_down.appendChild(opt6);
    drop_down.appendChild(opt7);

    sb_dtls.appendChild(drop_down);
    drop_down.value = temp[3];

    drop_down.addEventListener("change", save_status);
    // sb_details.appendChild(sb_dtls);

    sb_details.appendChild(sb_dtls);
  }

  let select_div = document.getElementsByClassName("select_div");
  let p_text = document.getElementsByClassName("p");
  let options = document.getElementsByClassName("li_item");
  let drop_list = document.getElementById("drop_list");
  let drop = document.getElementsByClassName("drop");
  let drop_icon = document.getElementById("status_icon");

  p_text.onclick = function () {
    drop_list.classList.toggle("hide");
    drop_icon.classList.toggle("rotate");
  };

  for (options of options) {
    options.onclick = function () {
      select_div.innerHTML = this.textContent;
      drop_list.classList.toggle("hide");
      drop_icon.classList.toggle("rotate");

      console.log("hello");
    };
  }
}

// ******************* then ok abhishek is working up dont come up ********************
// pradyumna is working here dont come down

// console.log(tno);

let avail_coach = {};
let temp = [];
for (let i = 0, len = localStorage.length; i < len; ++i) {
  let k = localStorage.key(i);
  if (k.includes(tno.toString() + "___")) {
    k = k.replace(tno.toString() + "___", "");
    temp.push(k);
  }
}

let key_temp = [];
for (let i = 0; i < temp.length; i++) {
  if (!key_temp.includes(temp[i].split("___")[0])) {
    key_temp.push(temp[i].split("___")[0]);
  }
}

for (let i = 0; i < key_temp.length; i++) {
  let cn = [];
  for (let j = 0; j < temp.length; j++) {
    if (
      !cn.includes(temp[j].split("___")[1]) &&
      temp[j].includes(key_temp[i])
    ) {
      cn.push(temp[j].split("___")[1]);
    }
  }
  avail_coach[key_temp[i]] = cn;
}

// console.log(avail_coach);
let coach_drop = document.getElementById("coach_drop");
let cno_drop = document.getElementById("cno_drop");

for (let [key, value] of Object.entries(avail_coach)) {
  console.log(key, value);
  let opt = document.createElement("option");
  opt.setAttribute("value", key);
  opt.textContent = key;
  coach_drop.appendChild(opt);
}

function add_cno_drop() {
  cno_drop.innerHTML = "";
  sb_details.innerHTML = "";

  let opt;
  opt = document.createElement("option");
  opt.setAttribute("value", "null");
  opt.textContent = "Coach No.";
  cno_drop.appendChild(opt);

  if (coach_drop.value == "null") {
  } else {
    let cno_list = avail_coach[coach_drop.value];

    for (let i = 0; i < cno_list.length; i++) {
      opt = document.createElement("option");
      opt.setAttribute("value", cno_list[i]);
      opt.textContent = cno_list[i];
      cno_drop.appendChild(opt);
    }
  }
}

function add_data() {
  if (cno_drop.value != "null") {
    let key =
      tno.toString() + "___" + coach_drop.value + "___" + cno_drop.value;
    console.log(key);
    add_sb_details(key);
  }
}

coach_drop.addEventListener("change", add_cno_drop);
cno_drop.addEventListener("change", add_data);

function formate_data() {
  let train_no = tno.toString();
  let base = JSON.parse(localStorage.getItem(train_no + "_base"));
  let date = localStorage.getItem(train_no + "_date");
  console.log(date);
  let train_name = base["train_name"];
  let train_from = base["From"];
  let train_to = base["To"];
  // let train_coach = base["Coach"];

  let data_temp = {};
  let data = {};

  for (let [key, value] of Object.entries(avail_coach)) {
    console.log(key, value);
    for (let i = 0; i < value.length; i++) {
      data_temp[train_no + "___" + key + "___" + value[i]] = JSON.parse(
        localStorage.getItem(train_no + "___" + key + "___" + value[i])
      );
    }
  }
  data["data"] = data_temp;

  console.log(data_temp);
  const send_data = {
    train_no: train_no,
    train_name: train_name,
    train_from: train_from,
    train_to: train_to,
    date: date,
    data: data
  };

  return send_data;
}

const sync = document.getElementById("sync");

sync.addEventListener("click", () => {
  const send_data = formate_data();
  // localStorage.setItem('myData', JSON.stringify(data));

  const xhr = new XMLHttpRequest();
  const csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;

  xhr.open("POST", "/sync_data");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("X-CSRFToken", csrfToken); // Add this line to include the CSRF token

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      alert("Data saved to server!");
    }
  };
  xhr.send("data=" + JSON.stringify(send_data));
});
