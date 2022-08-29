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
  const [loadingInital, setLoadingInital] = useState(true); //loadingInital is initally true
  const [loading, setLoading] = useState(false); //loading is initally false

  useEffect(() => {
    //This hook allows us to remember the user's login status
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInital(false); //after user is fetched, loadingInital is set to false
    });
    return unsub(); //unsubscribe from the auth listener
  }, []);

  const onLoginPress = (email, password) => {
    setLoading(true); //loading is set to true
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
    setLoading(false); //loading is set to false
  };
  const onRegisterPress = (email, password, confirmPassword) => {
    setLoading(true); //loading is set to true
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
    setLoading(false); //loading is set to false
  };

  const signOut = () => {
    setLoading(true); //loading is set to true
    auth.signOut();
    console.warn(user);
    setLoading(false); //loading is set to false
  };

  return (
    <AuthContext.Provider
      value={{ user, onLoginPress, onRegisterPress, signOut, loading }}
    >
      {!loadingInital && children}
    </AuthContext.Provider>
  );
};
//if loadingInital is true, we will render nothing ^

export default function useAuth() {
  return useContext(AuthContext);
}
