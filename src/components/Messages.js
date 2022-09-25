import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { motion } from "framer-motion";

const Messages = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [data.chatId]);

  return (
    <>
      <motion.div className='bg-gray-100 h-full p-4 flex flex-col items-start overflow-y-scroll pb-36'>
        {messages.map((message) => {
          return <Message message={message} key={message.id} />;
        })}
      </motion.div>
    </>
  );
};

export default Messages;
