import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "../utlis/constants";
import axios from "axios";
import Navbar from "@/shared/Navbar";


export default function Login() {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    })
    // const { loading , user } = useSelector(store => store.auth)
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            console.log(input)
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, input, {
                headers: {
                    "content-type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success("Register successful")
                navigate("/login")

            }

        } catch (err) {
            toast.error("Registration failed", {
                description: err.response?.data?.message || "Invalid credentials",
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm p-8 rounded-xl border-2 animate-neon-border"
                >
                    <h2 className="text-3xl font-bold text-[#FF004F] text-center mb-6 tracking-wide">
                        Registration Portal
                    </h2>

                    <div className='my-2 flex flex-col'>
                        <label className='text-sm'>Name</label>
                        <input
                            type="text"
                            placeholder='enter your name'
                            className='p-2 border rounded-md '
                            name='name'
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2 flex flex-col'>
                        <label className='text-sm'>Email</label>
                        <input
                            type="text"
                            placeholder='enter any dummy email it will work 😉'
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
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={input.role === "admin"}
                                    onChange={changeEventHandler}
                                    // disabled
                                    // className="cursor-not-allowed opacity-100"
                                    className=" opacity-100"
                                />
                                <span className="cursor-not-allowed text-white">Admin</span>
                            </label>

                        </div>



                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-[#FF004F] text-white font-bold hover:shadow-[0_0_15px_#FF004F] my-6"
                    >
                        Sign Up
                    </Button>
                    <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
                </form>
            </div>
        </>
    );
}
