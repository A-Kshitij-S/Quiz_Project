import { Button } from '@/components/ui/button';
import { USER_API_ENDPOINT } from '@/utlis/constants';
import axios from 'axios';
import React from 'react'
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Navbar() {
  const navigate= useNavigate()
  // const dispatch= useDispatch()

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
      `${USER_API_ENDPOINT}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

      if (res.data.success) {
        // dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
    }
  };
  return (
    <nav className="bg-[#0a0a0a] text-white px-6 py-4 flex justify-between items-center shadow-[0_0_20px_#00ffff] font-[Orbitron]">
      <div className="text-[#FF004F] font-bold text-2xl tracking-wide">
        ⚡ QuizZone
      </div>

      <div className="flex gap-6 text-lg">
        
        <span className="text-white hover:text-[#FF004F] transition-all">
          <Link to="/courses">Home</Link>
        </span>
        
        <span className="text-white hover:text-[#FF004F] transition-all">
          <Link to="/student-dashboard">My courses</Link>
        </span>
        <span className="text-white hover:text-[#FF004F] transition-all">
          <Button onClick={logoutHandler} variant="link">Logout</Button>
        </span>

      </div>
    </nav>
  );
}

