import Navbar from '@/shared/Navbar'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
  const {user}= useSelector(store=> store.auth)

  // if(user) console.log(user)
  

  return (
    <div>
      <Navbar />
      {!user ? (
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 text-center space-y-8">

        {/* Neon Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#00FFFF] drop-shadow-[0_0_10px_#00FFFF] font-[Orbitron]">
          Welcome to ⚡ QuizZone
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/80 max-w-xl">
          Challenge your knowledge. Compete, Learn, and Rule the Leaderboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <Link to="/login">
            <Button className="bg-[#FF004F] text-white text-lg font-bold px-6 py-3 hover:shadow-[0_0_15px_#FF004F]">
              Login
            </Button>
          </Link>

          <Link to="/courses">
            <Button className="bg-[#00FFFF] text-black text-lg font-bold px-6 py-3 hover:shadow-[0_0_15px_#00FFFF]">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
      ):(
        
        <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 text-center space-y-8">

        {/* Neon Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#00FFFF] drop-shadow-[0_0_10px_#00FFFF] font-[Orbitron]">
          Welcome, {user.name} to ⚡ QuizZone
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/80 max-w-xl">
          Challenge your knowledge. Compete, Learn, and Rule the Leaderboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          
          <Link to="/courses">
            <Button className="bg-[#00FFFF] text-black text-lg font-bold px-6 py-3 hover:shadow-[0_0_15px_#00FFFF]">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
      )}
    </div>
  )
}

export default Home
