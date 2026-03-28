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

/* 🔥 INIT */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 👤 USERNAME */
let currentUser = "user";

/* 🔐 LOGIN CHECK */
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.displayName || "Hacker";

    const welcome = document.getElementById("welcome");
    if (welcome) {
      welcome.innerText = "Welcome " + name + " 🚀";
    }

    currentUser = name.toLowerCase().replace(/\s+/g, "");
  } else {
    if (!window.location.href.includes("login.html")) {
      window.location.href = "login.html";
    }
  }
});

/* 📂 NAVIGATION */
window.go = (page) => {
  window.location.href = page;
};

/* 🚪 LOGOUT */
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
};

/* 📌 MODALS */
window.openAbout = () => {
  const el = document.getElementById("aboutModal");
  if (el) el.style.display = "flex";
};

window.openContact = () => {
  const el = document.getElementById("contactModal");
  if (el) el.style.display = "flex";
};

window.closeModal = () => {
  const about = document.getElementById("aboutModal");
  const contact = document.getElementById("contactModal");

  if (about) about.style.display = "none";
  if (contact) contact.style.display = "none";
};

/* 🚫 FORCE HIDE */
window.onload = () => {
  const about = document.getElementById("aboutModal");
  const contact = document.getElementById("contactModal");

  if (about) about.style.display = "none";
  if (contact) contact.style.display = "none";
};

/* =========================
   💻 TERMINAL SYSTEM
========================= */

const terminal = document.getElementById("terminal");
const input = document.getElementById("cmdInput");

/* 🔥 TYPE EFFECT */
function typeLine(text, speed = 20) {
  return new Promise(resolve => {
    const p = document.createElement("p");
    terminal.appendChild(p);

    let i = 0;
    const interval = setInterval(() => {
      p.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

/* 🔥 PRINT PROMPT */
function printPrompt() {
  const p = document.createElement("p");
  p.innerHTML = `${currentUser}@zerotrace:~$`;
  terminal.appendChild(p);
}

/* 🚀 BOOT ANIMATION */
async function bootSequence() {
  if (!terminal) return;

  terminal.innerHTML = "";

  await typeLine("root@zerotrace:~# boot");
  await typeLine("ZeroTrace OS Booting...");
  await typeLine("[ OK ] Loading kernel modules");
  await typeLine("[ OK ] Initializing network");
  await typeLine("[ OK ] Starting services");
  await typeLine("[ OK ] Mounting file system");
  await typeLine("Welcome to ZeroTrace OS 🔥");
  await typeLine("Type 'help' to start");

  printPrompt();
}

/* 🎯 COMMAND HANDLER */
function handleCommand(cmd) {
  const p = document.createElement("p");
  p.innerHTML = `${currentUser}@zerotrace:~$ ${cmd}`;
  terminal.appendChild(p);

  switch(cmd.toLowerCase()) {

    case "help":
      terminal.innerHTML += `
      <p>Commands:</p>
      <p>ls</p>
      <p>whoami</p>
      <p>clear</p>
      <p>open userguide</p>
      <p>open tools</p>
      <p>open nmap</p>
      <p>open burp</p>
      `;
      break;

    case "ls":
      terminal.innerHTML += `<p>userguide.html tools project.html</p>`;
      break;

    case "whoami":
      terminal.innerHTML += `<p>${currentUser}</p>`;
      break;

    case "clear":
      terminal.innerHTML = "";
      break;

    case "open userguide":
      window.location.href = "userguide.html";
      break;

    case "open tools":
      window.location.href = "tools/tools.html";
      break;

    case "open nmap":
      window.location.href = "practice/nmap-terminal.html";
      break;

    case "open burp":
      window.location.href = "practice/burp-terminal.html";
      break;

    case "open bruteforce":
      window.location.href = "practice/terminal-bruteforce.html";
      break;

    default:
      terminal.innerHTML += `<p>Command not found</p>`;
  }

  printPrompt();
  terminal.scrollTop = terminal.scrollHeight;
}

/* ⌨️ INPUT */
if (input) {
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const cmd = input.value.trim();
      input.value = "";
      handleCommand(cmd);
    }
  });
}

/* 🚀 START */
bootSequence();