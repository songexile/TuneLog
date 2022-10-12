import { db } from "../model/config"; // import the db config
import { get, ref, child, update } from "firebase/database";
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
          return true;
        }
      }
    }
  });
  return exist != undefined ? exist : false; //if username exist return true else return false
};

async function followUser(username, userId) {
  //follow user
  //check if username exists in firebase

  //this code checks if username exist
  //checks if user (you) is already following the user
  //if not then it will add to there followers list
  //and you will be following that user
  const exist = await get(child(ref(db), "users/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        for (const user in users) {
          if (users[user].username == username) {
            if (users[user].followers == userId) {
              console.warn("you are already following this user");
              //if user already follows the user
              return;
            }
            //add user to followers
            update(ref(db, "users/" + user), {
              //update the user that is being followed, you are now following the user
              followers: userId,
              //add followers

              //add to followers list
            });
            update(ref(db, "users/" + userId), {
              //update the user that is following, you are now followed by the user
              following: user,
            });
          } else {
            console.warn("user does not exist");
          }
        }
      }

      return false;
    })
    .catch((error) => {
      console.error(error);
    });
  const user = exist;
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
