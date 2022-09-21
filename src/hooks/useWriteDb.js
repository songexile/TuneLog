import { db } from "../model/config"; // import the db config
import { get, ref, set, child } from "firebase/database";
import useAuth from "./useAuth";

function writeUserName(userId, username) {
  set(ref(db, "users/" + userId), {
    username: username,
  });
}

// const writeUserName = (username) => {
//   const {user} = useAuth();
//   const userid = user.uid;
//   set(ref(db, "users/" + userid), {
//     username: username
//   });
// };

// const writeUserProfilePic = (profilePic) => {
//   const {user} = useAuth();
//   const userid = user.uid;
//   set(ref(db, "users/" + userid), {
//     profilePic: profilePic
//   });
// };

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

// const retriveUserData = () => {
//   const { user } = useAuth();
//   const userId = user.uid;

//   get(child(ref(db), "users/" + userId)).then((snapshot) => {
//     if (snapshot.exists()) {
//       console.warn(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   });
// };

export { writeUserName, retriveUserData };
