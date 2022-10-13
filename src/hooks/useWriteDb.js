import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set } from "firebase/database";
import { DevSettings, View } from "react-native";
import { async } from "@firebase/util";

async function writeUserName(userId, username) {
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
  const usernameExists = await userNameExist(username);

  if (!usernameExists) {
    update(ref(db, "users/" + userId), {
      username: username,
    });
  }
  return; //if username exist we just return
}

const userNameExist = async (username, userId) => {
  const exist = await get(child(ref(db), "users/")).then((snapshot) => {
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const user in users) {
        if (users[user].username == username) {
          return true; //if user name exist
        }
      }
    }
  });
  return exist != undefined ? exist : false; //if username exist return true else return false
};

async function followUser(username, userId) {
  const exist = await get(child(ref(db), "users/")).then((snapshot) => {
    //check if user exists
    if (snapshot.exists()) {
      const users = snapshot.val();
      for (const user in users) {
        if (users[user].username == username) {
          update(ref(db, "users/" + userId + "/following/" + user), {
            //this stores that user in your following tab
            time: Date.now(),
          }).then(() => {
            console.warn("user added to following list");
          });

          update(ref(db, "users/" + user + "/followers/" + userId), {
            //this stores you in the users followers tab
            time: Date.now(),
          });
        }
      }
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

export { writeUserName, retriveUserData, userNameExist, followUser };
