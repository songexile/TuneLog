import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB63YMhQFFuMhIi3umgZN150u7jHhaSBD0",

  authDomain: "tunelog-sdp.firebaseapp.com",

  projectId: "tunelog-sdp",

  storageBucket: "tunelog-sdp.appspot.com",

  messagingSenderId: "131094914328",

  appId: "1:131094914328:web:24ec6f2523da3c48d66a6d",

  measurementId: "G-3M26EMYV0Y",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth };
