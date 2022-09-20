import { db } from "../model/config"; // import the db config
import { ref, set } from "firebase/database";

export const writeUserData = (userId, imageUrl, username) => {
  set(ref(db, "users/" + userId), {
    username: 22,
    email: 1123123,
    profile_picture: 1,
  });
};
