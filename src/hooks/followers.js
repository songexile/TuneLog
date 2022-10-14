//used to display followers and following
import { db } from "../model/config"; // import the db config
import { get, ref, child, update, set } from "firebase/database";
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

  //  console.log(ids);

  for (const id in ids) {
    const name = await getUsernameFromId(ids[id]);
    usernames.push(name);
  }
  console.log(usernames);

  return usernames;
};
