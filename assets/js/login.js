import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDmxHZD0ZhG4xV5baookq6gNReaCay09tM",
  authDomain: "zerotrace-8f464.firebaseapp.com",
  projectId: "zerotrace-8f464",
  storageBucket: "zerotrace-8f464.firebasestorage.app",
  messagingSenderId: "721450663659",
  appId: "1:721450663659:web:137e7e4f2a4de6044508ae"
};

// 🔥 Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🚫 Prevent multiple clicks
let isLoggingIn = false;

// 🔐 LOGIN FUNCTION
window.loginWithGoogle = function () {

    if (isLoggingIn) return;

    isLoggingIn = true;

    const btn = document.getElementById("loginBtn");
    btn.disabled = true;
    btn.innerText = "Loading...";

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert(error.message);
        })
        .finally(() => {
            isLoggingIn = false;
            btn.disabled = false;
            btn.innerText = "Continue with Google";
        });
};