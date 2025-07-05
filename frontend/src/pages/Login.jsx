import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../utlis/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import Navbar from "@/shared/Navbar";

export default function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    })
    // const { loading , user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "content-type": "application/json"
                },
                withCredentials: true
            });
            const data = await res.data
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success("Login successful")
                if (data.user.role === "student") {
                    navigate("/");
                } else {
                    navigate("/");
                }

            }

        } catch (err) {
            toast.error("Login failed", {
                description: err.response?.data?.message || "Invalid credentials",
            });
        }
    };

    return (
        <>
            <Navbar/>
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm p-8 rounded-xl border-2 animate-neon-border"
                >
                    <h2 className="text-3xl font-bold text-[#FF004F] text-center mb-6 tracking-wide">
                        Login Portal
                    </h2>

                    <div className='my-2 flex flex-col'>
                        <label className='text-sm'>Email</label>
                        <input
                            type="text"
                            placeholder='enter your email'
                            className='p-2 border rounded-md '
                            name='email'
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2 flex flex-col'>
                        <label className='text-sm'>Password</label>
                        <input
                            type="password"
                            placeholder='***'
                            className='p-2 border rounded-md'
                            name='password'
                            value={input.password}
                            onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex gap-5 justify-between'>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="role"
                                    checked={input.role === "student"}
                                    value="student"
                                    onChange={changeEventHandler}
                                />
                                <span className='cursor-pointer'>Student</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === "admin"}
                                    onChange={changeEventHandler}
                                />
                                <span className='cursor-pointer'>Admin</span>
                            </label>
                        </div>



                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#FF004F] text-white font-bold hover:shadow-[0_0_15px_#FF004F] my-6"
                    >
                        Login
                    </Button>
                    <span className='text-sm'>Don't have an account? <Link to="/register" className="text-blue-600">Sign Up</Link></span>
                </form>
            </div>
        </>
    );
}
