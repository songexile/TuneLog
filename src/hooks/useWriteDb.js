import { db } from "../model/config"; // import the db config
import { get, ref, child, update } from "firebase/database";
import { DevSettings, View } from "react-native";

function writeUserName(userId, username) {
  // write the username to the db, if the name is already in the system, it will not be written

  if (username == "") {
    console.warn("username is null");
    return;
  }

  if (username.length > 20) {
    console.warn("username is too long");
    return;
  }

  if (username.length < 3) {
    console.warn("username is too short");
    return;
  }
  //check if username already exisits
  //check if username exists in firebase
  const usernameExists = usernameExist(username);
  console.warn(username + " : " + usernameExists);
  update(ref(db, "users/" + userId), {
    username: username,
  });
}

function usernameExist(username) {
  //boolean function to check if username exists in the db

  get(child(ref(db), "users/")).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const user in users) {
        if (users[user].username == username) return true;
      }
    }
  });
  return false;
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

export { writeUserName, retriveUserData, usernameExist };
