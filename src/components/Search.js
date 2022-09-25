import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleChange = async (e) => {
    const key = e.target.value.toLowerCase();
    const q = query(collection(db, "users"), where("displayName", "==", key));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUser(doc.data());
    });
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      dispatch({ type: "CHANGE_USER", payload: user });
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    document.getElementById("search").value = "";
  };
  return (
    <motion.div
      className=' bg-gray-100 rounded-xl top-[55px]  h-[3rem] text-sm flex justify-center items-center  ml-2 
      
      
       
      '
      exit={{
        width: 0,
        transition: {
          duration: 1,
        },
      }}
    >
      <motion.input
        onChange={(e) => handleChange(e)}
        initial={{
          width: 0,
        }}
        animate={{
          width: "150px",
          transition: {
            duration: 1,
          },
        }}
        exit={{
          width: 0,
          transition: {
            duration: 1,
          },
        }}
        id='search'
        placeholder='Enter a name'
        className=' text-sm px-2 py-1 rounded-3xl focus:outline-none focus:ring focus:border-blue-500 mr-1'
      />

      {user && (
        <motion.div
          onClick={handleSelect}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 1,
            },
          }}
          className=' bg-white mr-1 px-2 py-1  drop-shadow-md rounded-full flex justify-center items-center'
        >
          {/* <img src={pic} alt='pic' className='w-8 h-8 rounded-full' /> */}
          <span className='text-xl'>{user.photoURL}</span>
          <span className=' text-xs font-bold'>{user.displayName}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Search;
