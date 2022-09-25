import React, { useContext, useState } from "react";
import { SearchIcon } from "../assets/Svgs";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import Search from "./Search";
import { AnimatePresence } from "framer-motion";
import Chats from "./Chats";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <div className='py-4 px-5 overflow-hidden w-full fixed top-0 z-0 '>
      <h1 className='font-bold text-xs text-gray-500 mb-4 flex items-center justify-between'>
        <span>
          Hello {currentUser.displayName} {currentUser.photoURL}
        </span>
        <div>
          <a
            className='text-blue-300 border border-blue-300 rounded-md py-1 px-2 mr-3'
            href='mailto:manikantaksi2@gmail.com'
          >
            mani
          </a>
          <span
            onClick={() => signOut(auth)}
            className=' font-bold border rounded-lg py-1 px-2  text-[12px] text-white bg-rose-500'
          >
            log out
          </span>
        </div>
      </h1>
      <div className='px-1 pb-3 flex overflow-x-auto scroll no-scrollbar'>
        <div className='mr-4'>
          <div className=' search-bar bg-gray-100 min-w-[3.5rem] h-14 drop-shadow-md  rounded-full flex justify-center items-center px-3 transis'>
            <SearchIcon
              className='w-5 h-4 fill-gray-600'
              onClick={() => {
                setSearchOpen(!searchOpen);
              }}
            />
            <AnimatePresence>{searchOpen && <Search />}</AnimatePresence>
          </div>
        </div>
        <Chats />
      </div>
    </div>
  );
};

export default Header;
