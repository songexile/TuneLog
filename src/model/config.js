import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB63YMhQFFuMhIi3umgZN150u7jHhaSBD0",

  authDomain: "tunelog-sdp.firebaseapp.com",

  projectId: "tunelog-sdp",

  storageBucket: "tunelog-sdp.appspot.com",

  messagingSenderId: "131094914328",

  appId: "1:131094914328:web:24ec6f2523da3c48d66a6d",

  measurementId: "G-3M26EMYV0Y",
  databaseURL: "https://tunelog-sdp-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

export { auth, db };
