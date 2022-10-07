import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../model/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const AuthContext = createContext({});

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null); //user is initally null
  const [loadingInital, setLoadingInital] = useState(true); //loadingInital is initally true
  const [loading, setLoading] = useState(false); //loading is initally false
  const [spotifyToken, setSpotifyToken] = useState(null);

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
    setLoading(true);
    if (email === "" || password === "") {
      alert("Please enter your email and password");
      setLoading(false);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          alert("User not found");
        }
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password");
        } else {
          console.warn(error);
        }
      })
      .finally(() => {
        // to make sure it runs after the promise has resolved
        setLoading(false);
      });
  };

  const onRegisterPress = (email, password, confirmPassword) => {
    setLoading(true); //loading is set to true
    if (email === "" && password === "" && confirmPassword === "") {
      alert("All fields cannot be empty.");
      return;
    }

    if (password === "") {
      alert("Password cannot be empty.");
      return;
    }

    if (email === "") {
      alert("Email cannot be empty.");
      return;
    }

    if (confirmPassword === "") {
      alert("Confirm Password cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    const isVaildEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isVaildEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false); //loading is set to false
      });
  };

  const signOut = () => {
    setLoading(true); //loading is set to true
    auth.signOut();
    setUser(null); //user is set to null
    setLoading(false); //loading is set to false
  };

  const resetPassword = (email) => {
    setLoading(true); //loading is set to true

    if (email === "") {
      alert("Email cannot be empty.");
      return;
    }
    const isVaildEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isVaildEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent.");
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false); //loading is set to false
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onLoginPress,
        onRegisterPress,
        signOut,
        loading,
        resetPassword,
        spotifyToken,
        setSpotifyToken,
      }}
    >
      {!loadingInital && children}
    </AuthContext.Provider>
  );
};
//if loadingInital is true, we will render nothing ^

export default function useAuth() {
  return useContext(AuthContext);
}
