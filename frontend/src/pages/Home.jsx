import Navbar from '@/shared/Navbar'
import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector(store => store.auth)

  return (
    <div className="min-h-screen bg-black text-white ">
      <Navbar />

      <div className="flex flex-col justify-center items-center px-4 text-center space-y-8 py-16">
        {user ? (
          <>
            <h1 className="text-5xl md:text-6xl font-bold text-[#00FFFF] drop-shadow-[0_0_10px_#00FFFF]">
              Welcome, {user.name} to <span className='text-[#FF004F]'>Nptel Quiz App</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Challenge your knowledge. Compete, Learn.
            </p>
            <Link to="/courses">
              <Button className="bg-[#00FFFF] text-black text-lg font-bold px-6 py-3 hover:shadow-[0_0_15px_#00FFFF]">
                Explore Courses
              </Button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-5xl md:text-6xl font-bold text-[#00FFFF] drop-shadow-[0_0_10px_#00FFFF]">
              Welcome to Nptel Quiz App
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Challenge your knowledge. Compete, Learn.
            </p>
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
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto bg-[#111] border border-[#00FFFF30] rounded-xl shadow-[0_0_15px_#00FFFF40] p-6 mb-10 text-white">
        <h2 className="text-2xl font-semibold text-[#00FFFF] mb-3 drop-shadow-[0_0_5px_#00FFFF]">
          Welcome to the Quiz Portal
        </h2>
        <p className="text-white/80 leading-relaxed">
          You can browse and enroll in any course in all courses. Once enrolled, you'll get access to questions. <br />
          After attempting quizzes, you can head over to your profile to check your performance and attempt history.
        </p>
      </div>
      
      <div className="mt-10 text-center text-white/60 text-sm px-4 pb-8">
        <p>
          If you found this project helpful or interesting, consider giving it a ⭐ and feel free to{" "}
          <a
            href="https://github.com/A-Kshitij-S"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            follow me on GitHub
          </a>
          . I'd really appreciate it!
        </p>
      </div>


    </div>

  )
}

export default Home
