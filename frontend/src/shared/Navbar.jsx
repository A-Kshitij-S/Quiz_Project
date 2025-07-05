import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { logout, setUser } from '@/redux/authSlice';
import { USER_API_ENDPOINT } from '@/utlis/constants';
import axios from 'axios';
import { LogOut, User2 } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.auth)
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
    <nav className="bg-[#0a0a0a] text-white px-6 py-4 flex justify-between items-center shadow-[0_0_20px_#00ffff] font-[Orbitron]">
      <div className="text-[#FF004F] font-bold text-2xl tracking-wide">
        ⚡ QuizZone
      </div>

      <div>
        <ul className='flex font-medium h-16 items-center gap-6 justify-between p-3 '>
          {
            user && user.role === "admin" ? (
              < >
                <div className="flex gap-6 text-lg">
                  <span className="text-white hover:text-[#FF004F] transition-all">
                    <Link to="/">Home</Link>
                  </span>
                  <span className="text-white hover:text-[#FF004F] transition-all">
                    <Link to="/courses">Create Course</Link>
                  </span>

                  <span className="text-white hover:text-[#FF004F] transition-all">
                    <Link to="/courses">All Courses</Link>
                  </span>
                  <span className="text-white hover:text-[#FF004F] transition-all">
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </span>

                </div>
              </>
            ) : (
              <>
                <div className="flex gap-6 text-lg">

                  <span className="text-white hover:text-[#FF004F] transition-all">
                    <Link to="/">Home</Link>
                  </span>
                  <span className="text-white hover:text-[#FF004F] transition-all">
                    <Link to="/courses">All Courses</Link>
                  </span>

                  {user ? (
                    <>
                      <span className="text-white hover:text-[#FF004F] transition-all">
                        <Link to="/student-dashboard">My courses</Link>
                      </span>
                      <Popover>
                        <PopoverTrigger>
                          <Avatar className="cursor-pointer hover:shadow-[0_0_10px_#00FFFF] transition-all"> 
                            
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
                            
                          </Avatar>
                        </PopoverTrigger>
                        <div className="text-white hover:text-[#FF004F] transition-all">
                          <PopoverContent className="bg-[#0a0a0a] border border-[#00FFFF50] shadow-[0_0_20px_#00FFFF40] rounded-xl w-64">
                            <div className="p-4">
                              <div className="flex gap-4 py-2 cursor-pointer items-center border-b border-[#00FFFF30] pb-4">
                                
                                  <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                  
                                </Avatar>
                                <div className="text-white font-[Orbitron]">
                                  <h3 className="text-lg text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">{user?.name}</h3>
                                </div>
                              </div>
                              <div className="pt-4 space-y-2">
                                {
                                  user && user.role === "student" && (
                                    <div className="flex items-center gap-2">
                                      <span className="text-[#FF004F]"><User2 /></span>
                                      <Button variant="link" className="text-white hover:text-[#FF004F]"><Link to="/profile">View Profile</Link></Button>

                                    </div>
                                  )
                                }
                                <div className="flex items-center gap-2">
                                      <span className="text-[#FF004F]"><LogOut /></span>
                                      <Button variant="link" className="text-white hover:text-[#FF004F]"><span onClick={logoutHandler} className='cursor-pointer'>Logout</span></Button>

                                    </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </div>
                      </Popover>
                    </>
                  ) : (
                    <div className=''>
                      <span className="text-white hover:text-[#FF004F] transition-all pl-2">
                        <Link to="/login" className='pr-3'>Login</Link>
                      </span>
                      <span className="text-white hover:text-[#FF004F] transition-all">
                        <Link to="/register">Sign Up</Link>
                      </span>
                    </div>
                  )}


                </div>
              </>
            )
          }

        </ul>
      </div>
    </nav>
  );
}

