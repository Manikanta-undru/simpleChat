import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { AnimatePresence, motion } from "framer-motion";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        if (Object.keys(doc.data()).length !== 0) {
          setLoad(true);
        }
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);
  useEffect(() => {
    if (load) {
      const defaultUser = Object.entries(chats)?.sort(
        (a, b) => b[1].date - a[1].date
      );
      handleSelect(defaultUser[0][1].userInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, i) => {
          return (
            <AnimatePresence key={chat[0]}>
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.2 * i },
                }}
                exit={{
                  scale: 0,
                  transition: { duration: 0.5, delay: 0.2 * i },
                }}
                onClick={() => {
                  handleSelect(chat[1].userInfo);
                }}
                className=' bg-gray-100 w-14 h-14 mr-4 min-w-[3.5rem]  drop-shadow-md rounded-full flex justify-center items-center'
              >
                <span className='text-2xl'>{chat[1].userInfo.photoURL}</span>
              </motion.div>
            </AnimatePresence>
          );
        })}
    </>
  );
};

export default Chats;
