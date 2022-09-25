import React from "react";

import Chat from "../components/Chat";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className='w-screen h-screen max-h-screen bg-white overflow-hidden '>
      <Header />
      <Chat />
    </div>
  );
};

export default Home;
