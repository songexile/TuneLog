import { db } from "../model/config"; // import the db config
import { get, ref, child, update } from "firebase/database";
import { DevSettings } from "react-native";

function writeUserName(userId, username) {
  update(ref(db, "users/" + userId), {
    username: username,
  });
}

function writeProfilePicture(userId, profilePicture) {
  update(ref(db, "users/" + userId), {
    profilePicture: profilePicture,
  });
}

function retriveUserData(userId) {
  get(child(ref(db), "users/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function storeCurrentSong(userId, trackName, artist) {
  update(ref(db, "users/" + userId), {
    currentSong: trackName + " by " + artist,
  });
}

export { writeUserName, retriveUserData, storeCurrentSong, writeProfilePicture };

