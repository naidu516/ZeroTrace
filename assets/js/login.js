import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ YOUR CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDmxHZD0ZhG4xV5baookq6gNReaCay09tM",
  authDomain: "zerotrace-8f464.firebaseapp.com",
  projectId: "zerotrace-8f464",
  storageBucket: "zerotrace-8f464.appspot.com",
  messagingSenderId: "721450663659",
  appId: "1:721450663659:web:137e7e4f2a4de6044508ae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ LOGIN
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};