import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set, remove } from "firebase/database";
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
  console.warn("pressing follow user");
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

const unfollowUser = (username, userId) => {
  for (const user in users) {
    if (users[user].username == username) {
      remove(ref(db, "users/" + userId + "/following/" + user));
      remove(ref(db, "users/" + user + "/followers/" + userId));
    }
  }
};

const getUsernameFromId = async (userId) => {
  //this returns there username from the main id of the user
  get(child(ref(db), "users/" + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const username = snapshot.val().username;
        return username;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const returnFollowingUsername = async (userId) => {
  //this returns the username of the people you are following
  const usernames = [];

  ids = returnFollowing(userId);

  for (const usernames in ids) {
    const thisusername = await getUsernameFromId(usernames);
    usernames.push(thisusername);
    return usernames;
  }
};

const returnFollowing = async (userId) => {
  //go through db and return all the users that the user is following, not that this returns the ids not the nicknames

  const following = await get(child(ref(db), "users/" + userId + "/following/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        //go through each snapshot and return the username
        //for loop through snapshot
        const following = [];
        for (const user in snapshot.val()) {
          following.push(user);
        }
        return following;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return usernames;
};

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

function storeTopArtist(userId, topartist) {
  //this stores the stats of the user
  update(ref(db, "users/" + userId + "/stats"), {
    topartist: topartist,
  });
}

function storeTopTracks(userId, toptracks) {
  //this stores the stats of the user
  update(ref(db, "users/" + userId + "/stats"), {
    toptracks: toptracks,
  });
  console.warn(
    "top tracks stored in users/" + userId + "/stats" + "/toptracks"
  );
}

function storeCurrentSong(userId, trackName, artist) {
  update(ref(db, "users/" + userId), {
    currentSong: trackName + " by " + artist,
  });
  console.warn("storing current song");
}

function storeImage(userId, imageUrl) {
  update(ref(db, "users/" + userId), {
    imageUrl: imageUrl,
  });
  console.warn("storing image");
}

export {
  writeUserName,
  retriveUserData,
  userNameExist,
  followUser,
  returnFollowing,
  unfollowUser,
  returnFollowingUsername,
  storeTopArtist,
  storeTopTracks,
  storeCurrentSong,
  writeProfilePicture,
  storeImage,
};
