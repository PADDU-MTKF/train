function save_tno() {
  // let tno = document.getElementById("tno").textContent;
  // console.log(tno);
  value = tno.toString();
  let temp = [];
  try {
    temp = localStorage.getItem("train_no").split(",");
  } catch {
    temp = [];
  }

  if (!temp.includes(value)) {
    temp.push(value);
  }

  localStorage.setItem("train_no", temp);
  // console.log(value);
}

function save_base() {
  let key = tno.toString() + "_base";
  let temp;
  try {
    temp = JSON.parse(localStorage.getItem(key));
    if (temp == null) {
      let data = {};
      data["train_no"] = tno.toString();
      data["train_name"] = tname;
      data["From"] = from_dest;
      data["To"] = to_dest;
      data["Coach"] = Coach;
      data["Station"] = Station;

      localStorage.setItem(key, JSON.stringify(data));
    }
    console.log(temp);
  } catch {
    console.log("here");
    let data = {};
    data["train_no"] = tno.toString();
    data["train_name"] = tname;
    data["From"] = from_dest;
    data["To"] = to_dest;
    data["Coach"] = Coach;
    data["Station"] = Station;

    localStorage.setItem(key, JSON.stringify(data));
  }
}

let coach_drop = document.getElementById("coach_drop");
let coach_no = document.getElementById("coach_no");

function add_coach() {
  let key = tno.toString() + "_base";

  let temp = JSON.parse(localStorage.getItem(key));
  coach_drop = document.getElementById("coach_drop");
  temp = temp["Coach"].split(",");
  let opt;
  for (let i = 0; i < temp.length; i++) {
    opt = document.createElement("option");
    opt.setAttribute("value", temp[i]);
    opt.textContent = temp[i];
    coach_drop.appendChild(opt);
  }
}

// *********************function that creates inputboxes dynamically***********************

function suggest(e) {
  let ID = e.srcElement.id;
  let key = tno.toString() + "_base";
  let Station = JSON.parse(localStorage.getItem(key));
  Station = Station["Station"].split(",");
  let ele = document.getElementById(ID);
  ele.value = ele.value.toUpperCase();
  let value = ele.value;
  let temp = [];
  for (let i = 0; i < Station.length; i++) {
    if (value != "" && Station[i].includes(value.toUpperCase())) {
      temp.push(Station[i]);
    }
  }

  // put sugestion here to invisible
  console.log(temp);
}
let count = 250;
let add_count = 0;

function save_raw() {
  let coach = document.getElementById("coach_drop").value;
  let cno = document.getElementById("coach_no").value;

  data = JSON.parse(
    localStorage.getItem(
      tno.toString() + "___" + coach + "___" + cno.toString()
    )
  );

  // try {
  //   count = Object.keys(data).length;
  // } catch {}

  let raw = {};
  console.log("in save", count);
  for (let i = 0; i < count; i++) {
    let temp = [];
    let s = document.getElementById("s/b_" + i).value;
    let f = document.getElementById("from_" + i).value;
    let t = document.getElementById("to_" + i).value;
    let st = document.getElementById("status_" + i).value;
    temp.push(s);
    temp.push(f);
    temp.push(t);
    temp.push(st);

    raw[i] = temp;
  }
  // console.log(raw);
  console.log(count);
  let key = tno.toString() + "___" + coach + "___" + cno.toString();
  localStorage.setItem(key, JSON.stringify(raw));
}

function creat_text_box(rw, ID, cls, type, count, coach, cno, index) {
  let data = {};
  try {
    data = JSON.parse(
      localStorage.getItem(
        tno.toString() + "___" + coach + "___" + cno.toString()
      )
    );
    console.log("heeeeere");
    try {
      count = Object.keys(data).length;
      console.log("heeeeere2");
    } catch {}
  } catch {
    data = {};
  }
  console.log("in here", count);

  let sug_list = document.createElement("datalist");
  sug_list.setAttribute("id", "from_to_sugg");
  let key_temp = tno.toString() + "_base";
  let Station_list = JSON.parse(localStorage.getItem(key_temp));
  Station_list = Station_list["Station"].split(",");
  for (let i = 0; i < Station_list.length; i++) {
    let o = document.createElement("option");
    o.value = Station_list[i];
    sug_list.appendChild(o);
  }

  rw.appendChild(sug_list);

  for (let i = 0; i < count; i++) {
    add_count = i;
    // console.log("hello");
    let for_data = document.createElement("input");
    let for_data_br = document.createElement("br");
    for_data.setAttribute("id", ID + "_" + i);
    for_data.setAttribute("class", cls);
    for_data.setAttribute("type", type);

    if (ID == "from" || ID == "to") {
      for_data.setAttribute("list", "from_to_sugg");
    }

    if (data != {} && data != null && data[i][index] != "undefined") {
      for_data.value = data[i][index];
    }

    rw.appendChild(for_data);
    rw.appendChild(for_data_br);

    let inp = document.getElementById(ID + "_" + i);
    if (ID == "from" || ID == "to") {
      inp.addEventListener("input", suggest);
    }

    inp.addEventListener("focusout", save_raw);
  }
}

function temp(rw, ID, cls, type, count, coach, cno, index) {
  add_count = count;
  count += 1;
  // console.log("hello");
  let for_data = document.createElement("input");
  let for_data_br = document.createElement("br");
  for_data.setAttribute("id", ID + "_" + add_count);
  for_data.setAttribute("class", cls);
  for_data.setAttribute("type", type);

  rw.appendChild(for_data);
  rw.appendChild(for_data_br);

  let inp = document.getElementById(ID + "_" + add_count);
  if (ID == "from" || ID == "to") {
    inp.addEventListener("input", suggest);
  }
  inp.addEventListener("focusout", save_raw);
}

function add_new_text() {
  if (coach_drop.value != "null" && coach_no.value != "") {
    temp(
      rw0,
      "s/b",
      "set_border",
      "number",
      count,
      coach_drop.value,
      coach_no.value,
      0
    );
    temp(
      rw1,
      "from",
      "set_border1",
      "text",
      count,
      coach_drop.value,
      coach_no.value,
      1
    );
    temp(
      rw2,
      "to",
      "set_border2",
      "text",
      count,
      coach_drop.value,
      coach_no.value,
      2
    );

    temp(
      rw3,
      "status",
      "set_border3",
      "hidden",
      count,
      coach_drop.value,
      coach_no.value,
      3
    );

    count += 1;
    save_raw();
  }
}

save_tno();
save_base();
add_coach();

let rw0 = document.getElementById("row_info");
let rw1 = document.getElementById("row_info1");
let rw2 = document.getElementById("row_info2");
let rw3 = document.getElementById("row_info3");
let coach_seat = {
  "HA1-FIRST_CLASS": 10,
  "HA1-2_TIER_AC": 28,
  "HA1-2_TIER": 28,
  A1: 56,
  A2: 56,
  B1: 80,
  B2: 80,
  B3: 80,
  B4: 80,
  B5: 80,
  B6: 80,
  S11: 120,
  S10: 120,
  S9: 120,
  S8: 120,
  S7: 120,
  S6: 120,
  S5: 120,
  S4: 120,
  S3: 120,
  S2: 120,
  S1: 120,
  "AB1-2TIER": 24,
  "AB1-3 TIER": 32,
  M1: 100,
  M2: 100
};

function add_txt() {
  if (coach_drop.value) {
    rw0.innerHTML = "";
    rw1.innerHTML = "";
    rw2.innerHTML = "";
    rw3.innerHTML = "";

    if (coach_drop.value != "null" && coach_no.value != "") {
      try {
        data = JSON.parse(
          localStorage.getItem(
            tno.toString() +
              "_" +
              coach_drop.value +
              "_" +
              coach_no.value.toString()
          )
        );

        count = Object.keys(data).length;
        console.log("start", count);

        console.log(count);
      } catch (e) {
        try {
          count = coach_seat[coach_drop.value];
          console.log(e);
        } catch {
          count = 250;
        }
      }
      creat_text_box(
        rw0,
        "s/b",
        "set_border",
        "number",
        count,
        coach_drop.value,
        coach_no.value,
        0
      );
      creat_text_box(
        rw1,
        "from",
        "set_border1",
        "text",
        count,
        coach_drop.value,
        coach_no.value,
        1
      );
      creat_text_box(
        rw2,
        "to",
        "set_border2",
        "text",
        count,
        coach_drop.value,
        coach_no.value,
        2
      );

      creat_text_box(
        rw3,
        "status",
        "set_border3",
        "hidden",
        count,
        coach_drop.value,
        coach_no.value,
        3
      );
    }
  }
}

coach_drop.addEventListener("change", add_txt);

coach_no.addEventListener("focusout", add_txt);

function clear_raw() {
  coach = coach_drop.value;
  cno = coach_no.value;
  try {
    localStorage.removeItem(
      tno.toString() + "___" + coach + "___" + cno.toString()
    );
    add_txt();
  } catch {}
}

//**************************************testing ***********************************
let plus = document.getElementsByClassName("plus")[0];

plus.addEventListener("click", add_new_text);

let date_box = document.getElementById("date_txt");

function date_change(e) {
  localStorage.setItem(
    tno.toString() + "_" + "date",
    date_box.value.toString()
  );
}
