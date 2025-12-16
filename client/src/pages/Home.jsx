import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";


const Home = () => {
  return (
    /* <div
      className="flex flex-col items-center justify-center min-h-screen
      bg-gradient-to-br from-blue-100/60 to-blue-300/60
      bg-[url('/bg_img.png')] bg-cover bg-center bg-blend-overlay"
    > */
    <div
      className="flex items-center justify-center min-h-screen px-6 sm:px-0
      bg-gradient-to-br from-blue-100 to-blue-300"
    >
      <Navbar />
      <Header />
    
    </div>
  );
};

export default Home;
