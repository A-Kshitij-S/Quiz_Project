import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { COURSE_API_ENDPOINT } from '@/utlis/constants';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/shared/Navbar';

const CreateCourse = () => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        code: '',
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(form)
        if (!form.title || !form.description || !form.code) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const res = await axios.post(`${COURSE_API_ENDPOINT}/create`, form, {
                withCredentials: true,
            });
            const { _id: courseId, title: courseName } = res.data.course;

            toast.success("Course created successfully.");

            navigate("/create/week", {
                state: { courseId, courseName }
            })
            setForm({ name: '', description: '', instructor: '' });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create course.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-[Orbitron]">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-[#111] border border-[#00FFFF30] shadow-[0_0_20px_#00FFFF40] rounded-xl">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-bold text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">
                                Create New Course
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm mb-1 text-white">Title</label>
                                    <Input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Data Structures"
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1 text-white">Description</label>
                                    <Textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        placeholder="Short description..."
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1 text-white">Code</label>
                                    <Input
                                        name="code"
                                        value={form.code}
                                        onChange={handleChange}
                                        placeholder="Instructor's name"
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="bg-[#FF004F] text-white hover:bg-[#ff2e6e] w-full shadow-[0_0_10px_#FF004F]"
                                >
                                    Create Course
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div> 
        </>
    );
};

export default CreateCourse;
