/* 🔥 FIREBASE IMPORTS (CDN VERSION FOR YOUR SETUP) */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* 🔥 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDmxHZD0ZhG4xV5baookq6gNReaCay09tM",
  authDomain: "zerotrace-8f464.firebaseapp.com",
  databaseURL: "https://zerotrace-8f464-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "zerotrace-8f464",
  storageBucket: "zerotrace-8f464.firebasestorage.app",
  messagingSenderId: "721450663659",
  appId: "1:721450663659:web:137e7e4f2a4de6044508ae"
};

/* 🔥 INIT FIREBASE */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 🔐 LOGIN CHECK (FIXED SAFE) */
onAuthStateChanged(auth, (user) => {
  if (user) {
    const welcome = document.getElementById("welcome");
    if (welcome) {
      welcome.innerText = "Welcome " + user.displayName + " 🚀";
    }
  } else {
    // prevent redirect loop (only redirect if not already on login)
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

/* 📌 MODALS (FIXED CENTER + NO AUTO OPEN) */
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

/* 🚫 FORCE HIDE ON LOAD (CRITICAL FIX) */
window.onload = () => {
  const about = document.getElementById("aboutModal");
  const contact = document.getElementById("contactModal");

  if (about) about.style.display = "none";
  if (contact) contact.style.display = "none";
};

/* 💻 KALI TERMINAL SIMULATION (STABLE VERSION) */
const terminal = document.getElementById("terminal");

if (terminal) {
  const lines = [
    "root@zerotrace:~# boot",
    "ZeroTrace OS Booting...",
    "Type 'help' to start",
    "root@zerotrace:~# help",
    "help, ls, whoami, nmap, clear",
    "root@zerotrace:~# ls",
    "tools project.html tracker.html",
    "root@zerotrace:~# whoami",
    "root",
    "root@zerotrace:~# nmap scan",
    "Scanning target...",
    "Open ports: 22, 80, 443",
    "root@zerotrace:~# access",
    "Access Granted ✔",
    "Admin Mode Enabled 🔥"
  ];

  let i = 0;

  function runTerminal() {
    if (i < lines.length) {
      terminal.innerHTML += lines[i] + "<br>";
      terminal.scrollTop = terminal.scrollHeight;
      i++;
      setTimeout(runTerminal, 700);
    } else {
      terminal.innerHTML += "<br>root@zerotrace:~# ";
    }
  }

  runTerminal();
}