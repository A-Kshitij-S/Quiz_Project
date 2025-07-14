import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { WEEK_API_ENDPOINT } from '@/utlis/constants';
import Navbar from '@/shared/Navbar';

const CreateWeek = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const courseId = location.state?.courseId || '';
    const courseName = location.state?.courseName || '';

    const [week, setWeek] = useState({
        weekNumber: '',
        title: ''
    });

    const handleChange = (e) => {
        setWeek({ ...week, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const weekNum = Number (week.weekNumber);
        if (!weekNum || weekNum < 1 || weekNum > 12 || !week.title.trim()) {
            toast.error('Week number (1-12) and title are required');
            return;
        }

        try {
            const res = await axios.post(`${WEEK_API_ENDPOINT}/create`, {
                course:courseId,
                weekNumber: weekNum,
                title: week.title.trim()
            }, {
                withCredentials: true,
            });

            toast.success('Week created successfully');

            navigate("/create/question", {
                state: {
                    courseId,
                    courseName,
                    weekNum
                }
            });
        } catch (err) {
            toast.error(err?.response?.data?.message || "Error creating week");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-[Orbitron]">
                <div className="max-w-xl mx-auto">
                    <Card className="bg-[#111] border border-[#00FFFF30] shadow-[0_0_20px_#00FFFF40] rounded-xl">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-bold text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">
                                Add Week to <span className="text-[#FF004F]">{courseName}</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm mb-1 text-white">Week Number (1–12)</label>
                                    <Input
                                        type="number"
                                        name="weekNumber"
                                        value={week.weekNumber}
                                        onChange={handleChange}
                                        min="1"
                                        max="12"
                                        placeholder="e.g. 1"
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1 text-white">Week Title</label>
                                    <Input
                                        name="title"
                                        value={week.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Arrays and Linked Lists"
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="bg-[#FF004F] text-white hover:bg-[#ff2e6e] w-full shadow-[0_0_10px_#FF004F]"
                                >
                                    Create Week
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CreateWeek;
