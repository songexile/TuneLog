import { db } from "../model/config"; // import the db config
import { get, ref, child, update } from "firebase/database";
import { DevSettings } from "react-native";

function writeUserName(userId, username) {
  // write the username to the db, if the name is already in the system, it will not be written
  if (username == null) {
    return;
  }
  //check if username already exisits
  //check if username exists in firebase
  get(child(ref(db), "users/")).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const user in users) {
        if (users[user].username == username) {
          console.warn("username already exists");
          return;
        }
      }
      update(ref(db, "users/" + userId), {
        username: username,
      });
    }
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

export { writeUserName, retriveUserData };
