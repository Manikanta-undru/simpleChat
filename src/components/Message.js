import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const date = new Date(message.date.seconds * 1000);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`max-w-md relative my-4 ${
        message.senderId === currentUser.uid && "outMessage"
      } `}
    >
      <p
        className={
          "bg-white text-xs w-fit max-w-sm text-gray-600 px-4 font-medium py-2 rounded-2xl rounded-bl-none shadow-sm "
        }
      >
        {message.text}
      </p>
      <span
        ref={ref}
        className='text-gray-500 text-[10px] absolute left-3 mt-1'
      >
        {date.toLocaleTimeString("en-GB")}
      </span>
    </div>
  );
};

export default Message;
