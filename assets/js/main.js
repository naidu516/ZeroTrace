/* 🔥 FIREBASE IMPORTS */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDmxHZD0ZhG4xV5baookq6gNReaCay09tM",
  authDomain: "zerotrace-8f464.firebaseapp.com",
  projectId: "zerotrace-8f464",
  appId: "1:721450663659:web:137e7e4f2a4de6044508ae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUser = "user";

/* 🔐 LOGIN CHECK */
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || "Hacker";
    document.getElementById("welcome").innerText = "Welcome " + name + " 🚀";
    currentUser = name.toLowerCase().replace(/\s+/g, "");
  } else {
    window.location.href = "login.html";
  }
});

/* NAV */
window.go = (p) => window.location.href = p;
window.logout = () => signOut(auth).then(() => window.location.href = "login.html");

window.openAbout = () => document.getElementById("aboutModal").style.display = "flex";
window.openContact = () => document.getElementById("contactModal").style.display = "flex";
window.closeModal = () => {
  document.getElementById("aboutModal").style.display = "none";
  document.getElementById("contactModal").style.display = "none";
};

/* =========================
   💻 TERMINAL
========================= */

let terminal;
let input = "";

const fileSystem = {
  home: {
    user: {
      userguide: null,
      project: null,
      tools: { tools: null },
      practice: { nmap: null, burp: null, sql: null }
    }
  }
};

let currentPath = ["home","user"];

function getDir() {
  let d = fileSystem;
  currentPath.forEach(p => d = d[p]);
  return d;
}

function pathStr() {
  return "/" + currentPath.join("/");
}

function print(text, type="normal") {
  const line = document.createElement("div");

  if (type === "error") line.style.color = "red";
  if (type === "dir") line.style.color = "#00d9ff";

  line.textContent = text;
  terminal.appendChild(line);
}

function newPrompt() {
  const line = document.createElement("div");
  line.className = "input-line";
  terminal.appendChild(line);
  updateLine();
}

function updateLine() {
  const line = document.querySelector(".input-line:last-child");
  if (line) {
    line.textContent = `${currentUser}@zerotrace:${pathStr()}$ ${input}`;
  }
}

function boot() {
  terminal.innerHTML = "";
  print("ZeroTrace OS Booting...");
  print("Type 'help' to start");
  newPrompt();
}

function run(cmd) {

  print(`${currentUser}@zerotrace:${pathStr()}$ ${cmd}`);

  const [c,arg] = cmd.split(" ");

  switch(c){

    case "help":
      print("ls  cd  pwd  clear  whoami  open");
      break;

    case "ls":
      const d = getDir();
      for (let i in d){
        print(i, typeof d[i]==="object" ? "dir":"normal");
      }
      break;

    case "pwd":
      print(pathStr());
      break;

    case "whoami":
      print(currentUser);
      break;

    case "clear":
      boot();
      return;

    case "cd":
      if (!arg) return print("missing arg","error");
      if (arg==="..") currentPath.pop();
      else if (getDir()[arg]) currentPath.push(arg);
      else print("no dir","error");
      break;

    case "open":
      if (arg==="userguide") location.href="userguide.html";
      else if (arg==="project") location.href="project.html";
      else if (arg==="tools") location.href="tools/tools.html";
      else print("file not found","error");
      return;

    default:
      print("command not found","error");
  }

  newPrompt();
}

/* =========================
   🔥 FINAL FIXED INPUT SYSTEM
========================= */

document.addEventListener("DOMContentLoaded", ()=>{

  terminal = document.getElementById("terminal");
  terminal.tabIndex = 0;
  terminal.focus();

  // ❌ REMOVE old listeners (if any)
  terminal.onkeydown = null;

  terminal.addEventListener("keydown",(e)=>{

    e.preventDefault();
    e.stopPropagation(); // 🔥 VERY IMPORTANT (fix double typing)

    if (e.repeat) return; // 🔥 prevent holding key duplication

    // TYPE
    if (e.key.length === 1){
      input += e.key;
      updateLine();
    }

    // BACKSPACE
    else if (e.key === "Backspace"){
      input = input.slice(0,-1);
      updateLine();
    }

    // ENTER
    else if (e.key === "Enter"){
      const cmd = input.trim();
      input = "";

      if(cmd) run(cmd);
      else newPrompt();
    }

  });

  boot();
});