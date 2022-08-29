import { View, Text } from "react-native";
import React, { createContext, useContext } from "react";
import { auth } from "../model/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const onLoginPress = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        const user = userCredential.user;
        console.warn("signed in");
        console.warn(user);
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
  return (
    <AuthContext.Provider value={{ user: null, onLoginPress }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
