import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { motion } from "framer-motion";
const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className=' w-full  fixed bottom-0 z-1 top-32 '>
      <div className='bg-white border-t'>
        <motion.div
          initial={{
            x: -20,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
            transition: { duration: 1 },
          }}
          exit={{
            x: -20,
            opacity: 0,
            transition: { duration: 0.5 },
          }}
          className='flex items-center py-3 px-5 '
        >
          <span className='text-3xl rounded-full'>{data.user.photoURL}</span>
          <h3 className=' font-bold text-sm ml-2'>{data.user?.displayName}</h3>
        </motion.div>
      </div>
      <div className=' w-full h-full relative '>
        <Messages />
        <Input />
      </div>
    </div>
  );
};

export default Chat;
