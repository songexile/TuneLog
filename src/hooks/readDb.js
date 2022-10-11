import { db } from "../model/config"; // import the db config
import { get, ref, set, child } from "firebase/database";
import useAuth from "./useAuth";
import { React, useState, useEffect } from "react";
import { Text, View } from "react-native";

function useDisplayName() {
  const [displayName, setDisplayName] = useState("");
  const { user } = useAuth();
  const userId = user.uid;

  useEffect(() => {
    get(child(ref(db), "users/" + userId)).then((snapshot) => {
      if (snapshot.exists()) {
        setDisplayName(snapshot.val().username);
      } else {
        console.log("No data available");
      }
    });
  }, []);
  return displayName;
}

function useFeelingMood() {
  const { user } = useAuth();
  const userId = user.uid;
  const [artist, setArtist] = useState("gg");
  const [song, setSong] = useState("gg");

  useEffect(() => {
    get(child(ref(db), "users/" + userId)).then((snapshot) => {
      if (snapshot.exists()) {
        setArtist(snapshot.val().artist);
        setSong(snapshot.val().song);
      } else {
        console.log("No data available");
      }
    });
  }, []);
  return [artist, song];
}

export { useDisplayName, useFeelingMood };
