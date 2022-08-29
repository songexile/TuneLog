import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../model/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //user is initally null

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const onLoginPress = (email, password) => {
    //Takes in two arguments, email and password used in LoginScreen class
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.warn("signed in");
        console.warn(user);
        //Navigate after sign in
        // ...
      })
      .catch((error) => {
        //If any error we will catch
        const errorCode = error.code;

        if (errorCode === "auth/user-not-found") {
          console.warn("User not found");
        }

        if (errorCode === "auth/wrong-password") {
          console.warn("Wrong password");
        } else {
          console.warn(error);
        }
      });
  };
  const onRegisterPress = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        alert("Welcome");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, onLoginPress, onRegisterPress }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
