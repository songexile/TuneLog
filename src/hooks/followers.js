//used to display followers and following
import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set, remove } from "firebase/database";
export const getUsernameFromId = async (userId) => {
  //this returns there username from the main id of the user
  const username = await get(child(ref(db), "users/" + userId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const username = snapshot.val().username;
        //console.log(username);
        //tostring
        return username;
        //return username;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return username;
};

export const returnFollowing = async (userId) => {
  //go through db and return all the users that the user is following, not that this returns the ids not the nicknames
  // and will need to be converted with getUsername from id

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
      console.log("no data");
    })
    .catch((error) => {
      console.error(error);
    });

  // console.log(following);
  return following;
};

export const getAllUsernames = async (userId) => {
  const ids = await returnFollowing(userId);
  const usernames = [];
  var jsonArr = [];

  //  console.log(ids);

  for (const id in ids) {
    const name = await getUsernameFromId(ids[id]);
    const profilePic = await getProfilePicture(ids[id]);
    const currentListening = await getCurrentListening(ids[id]);
    console.log(currentListening + "!!");
    console.log(ids[id]);
    jsonArr.push({
      id: ids[id],
      name: name,
      profilePic: profilePic,
      currentListening: currentListening,
    });

    //  usernames.push(name);
  }
  // console.log(usernames);
  // console.log(jsonArr);
  //console.log(jsonArr);

  return jsonArr;
};

export const getProfilePicture = async (userId) => {
  //this will return the profile picture of the user
  //this returns there username from the main id of the user
  const profilePicture = await get(
    child(ref(db), "users/" + userId + "/imageUrl")
  ).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
    }
  });
  return profilePicture;
};

export const getCurrentListening = async (userId) => {
  const currentSong = await get(
    child(ref(db), "users/" + userId + "/currentListening")
  ).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshot.val().currentSong;
    } else {
      return "Nothing";
    }
  });
  return currentSong;
};

export const unfollowUser = async (yourUserId, thereUserId) => {
  //update the db
  remove(ref(db, "users/" + yourUserId + "/following/" + thereUserId)); //removes you from following them
  remove(ref(db, "users/" + thereUserId + "/followers/" + yourUserId)); //removes you for there follower list
  console.warn("unfollowed");
};
