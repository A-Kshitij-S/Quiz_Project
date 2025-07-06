import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { logout, setUser } from '@/redux/authSlice';
import { USER_API_ENDPOINT } from '@/utlis/constants';
import axios from 'axios';
import { LogOut, Menu, User2, X } from 'lucide-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.auth)
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
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
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed. Please try again.");
    }
  };
  return (
    <nav className="bg-[#0a0a0a] text-white px-6 py-4 shadow-[0_0_20px_#00ffff] font-[Orbitron] relative z-50 sticky top-0">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <div className="text-[#FF004F] font-bold text-2xl tracking-wide">
          ⚡ QuizZone
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          {user && user.role === "admin" ? (
            <>
              <NavItem to="/">Home</NavItem>
              <NavItem to="/courses">Create Course</NavItem>
              <NavItem to="/courses">All Courses</NavItem>
              <Button onClick={logoutHandler} variant="link">Logout</Button>
            </>
          ) : (
            <>
              <NavItem to="/">Home</NavItem>
              <NavItem to="/courses">All Courses</NavItem>

              {user ? (
                <>
                  <NavItem to="/student-dashboard">My Courses</NavItem>
                  <Popover>
                    <PopoverTrigger>
                      <Avatar className="cursor-pointer hover:shadow-[0_0_10px_#00FFFF] transition-all">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="bg-[#0a0a0a] border border-[#00FFFF50] shadow-[0_0_20px_#00FFFF40] rounded-xl w-64">
                      <div className="p-4">
                        <div className="flex gap-4 py-2 border-b border-[#00FFFF30] pb-4">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">{user.name}</h3>
                          </div>
                        </div>
                        <div className="pt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <User2 className="text-[#FF004F]" />
                            <Button variant="link" className="text-white hover:text-[#FF004F]">
                              <Link to="/profile">View Profile</Link>
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <LogOut className="text-[#FF004F]" />
                            <Button variant="link" className="text-white hover:text-[#FF004F]">
                              <span onClick={logoutHandler} className="cursor-pointer">Logout</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <>
                  <NavItem to="/login">Login</NavItem>
                  <NavItem to="/register">Sign Up</NavItem>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-lg">
          {user && user.role === "admin" ? (
            <>
              <NavItem to="/" onClick={closeMenu}>Home</NavItem>
              <NavItem to="/courses" onClick={closeMenu}>Create Course</NavItem>
              <NavItem to="/courses" onClick={closeMenu}>All Courses</NavItem>
              <Button onClick={() => { logoutHandler(); closeMenu(); }} variant="link">
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavItem to="/" onClick={closeMenu}>Home</NavItem>
              <NavItem to="/courses" onClick={closeMenu}>All Courses</NavItem>

              {user ? (
                <>
                  <NavItem to="/student-dashboard" onClick={closeMenu}>My Courses</NavItem>
                  <NavItem to="/profile" onClick={closeMenu}>Profile</NavItem>
                  <Button onClick={() => { logoutHandler(); closeMenu(); }} variant="link">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <NavItem to="/login" onClick={closeMenu}>Login</NavItem>
                  <NavItem to="/register" onClick={closeMenu}>Sign Up</NavItem>
                </>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}

const NavItem = ({ to, children, onClick }) => (
  <span className="text-white hover:text-[#FF004F] transition-all block">
    <Link to={to} onClick={onClick}>{children}</Link>
  </span>
);