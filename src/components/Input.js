import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

const Input = () => {
  const [text, setText] = useState("");
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [btnColor, setBtnColor] = useState(false);
  const handleSend = async () => {
    if (text) {
      setBtnColor(true);
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        setText("");
        setBtnColor(false);
      } catch (error) {}
    }
  };

  return (
    <div className='bg-gray-100 p-1 flex justify-center items-center  absolute bottom-16 left-0 right-0 h-20 '>
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        exit={{
          y: 100,
          opacity: 0,
          transition: { duration: 0.5 },
        }}
        className='border  w-fit  rounded-3xl flex bg-white'
      >
        <input
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          placeholder='type a message'
          className='text-sm text-gray-700  py-2 px-4 w-60 rounded-l-full '
        />
        <button
          onClick={handleSend}
          className={`text-2xl font-semibold text-blue-500 py-0 px-4 rounded-full ${
            btnColor && "blue-button"
          } `}
        >
          &gt;
        </button>
      </motion.div>
    </div>
  );
};

export default Input;
