import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set, remove } from "firebase/database";
import { DevSettings, View } from "react-native";
import { async } from "@firebase/util";

async function writeUserName(userId, username) {
  // write the username to the db, if the name is already in the system, it will not be written

  if (username == "") {
    return "Username is empty, please write something";
  }

  if (username.length > 20) {
    return "Username is too long please keep it under 20 characters";
  }

  if (username.length < 3) {
    return "Username is too short please keep it over 3 characters";
  }
  //check if username already exisits
  //check if username exists in firebase
  const usernameExists = await userNameExist(username);

  if (!usernameExists) {
    update(ref(db, "users/" + userId), {
      username: username,
    });
    return "username was updated";
  }
  return "Username already exists, please enter something else."; //if username exist we just return
}

function writeBio(userId, bio) {
  if (bio == "") {
    return "Bio is empty, please write something";
  }

  if (bio.length > 30) {
    return "Bio is too long please keep it under 30 characters";
  } else {
    update(ref(db, "users/" + userId), {
      bio: bio,
    });
    return "Bio has been updated.";
  }
}

export async function getBio(userId) {
  const bio = await get(child(ref(db), "users/" + userId + "/bio")).then(
    (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }
  );
  return bio;
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
          }).then(() => {});

          update(ref(db, "users/" + user + "/followers/" + userId), {
            //this stores you in the users followers tab
            time: Date.now(),
          });
          return true;
        }
      }
    }
  });
  if (exist == undefined) {
    return "There is no user under that name";
  }
  return "User was found and followed";
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

function storeCurrentSong(userId, trackName, artist, imageUrl) {
  update(ref(db, "users/" + userId + "/currentListening"), {
    currentSong: trackName + " by " + artist,
    imageUrl: imageUrl,
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
  writeBio,
  getUsernameFromId,
};
