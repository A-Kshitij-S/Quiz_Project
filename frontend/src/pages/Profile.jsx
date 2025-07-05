import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/shared/Navbar";

export default function Profile() {
  const [name, setName] = useState("Ankur Kshitij Sahai");
  const [email] = useState("ankur@example.com");
  const [role] = useState("student");

  const [password, setPassword] = useState("");

  const handleUpdate = () => {
    toast.success("Profile updated!");
    // Later: call API to update profile
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-black text-white px-6 py-10">
        <h1 className="text-3xl font-bold text-[#00FFFF] font-[Orbitron] mb-8 drop-shadow-[0_0_10px_#00FFFF] text-center">
          Profile Settings
        </h1>

        <div className="max-w-xl mx-auto bg-[#111] p-8 rounded-xl border border-[#00FFFF] shadow-[0_0_20px_#00FFFF40] space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-[#FF004F]">
              Name
            </Label>
            <Input
              id="name"
              className="bg-[#222] text-white mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email (disabled) */}
          <div>
            <Label htmlFor="email" className="text-[#FF004F]">
              Email
            </Label>
            <Input
              id="email"
              className="bg-[#222] text-white mt-1 cursor-not-allowed"
              value={email}
              disabled
            />
          </div>

          {/* Role (disabled) */}
          <div>
            <Label htmlFor="role" className="text-[#FF004F]">
              Role
            </Label>
            <Input
              id="role"
              className="bg-[#222] text-white mt-1 cursor-not-allowed"
              value={role}
              disabled
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password" className="text-[#FF004F]">
              New Password
            </Label>
            <Input
              id="password"
              className="bg-[#222] text-white mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
            />
          </div>

          {/* Update Button */}
          <div className="text-center mt-6">
            <Button
              onClick={handleUpdate}
              className="bg-[#FF004F] hover:shadow-[0_0_12px_#FF004F]"
            >
              Update Profile
            </Button>
          </div>
        </div>

        {/* Quiz History */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-[#00FFFF] mb-4">
            Your Quiz History
          </h2>

          {/* Dummy data */}
          {[
            {
              title: "Python Basics - Week 1",
              score: "8/10",
              date: "July 3, 2025",
            },
            {
              title: "Web Dev - Week 2",
              score: "7/10",
              date: "June 28, 2025",
            },
          ].map((attempt, i) => (
            <div
              key={i}
              className="bg-[#111] border border-[#FF004F] p-4 mb-4 rounded-xl shadow-[0_0_12px_#FF004F40]"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-[#FF004F]">{attempt.title}</h3>
                  <p className="text-white/70 text-sm">
                    Score: {attempt.score} | Date: {attempt.date}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-[#FF004F] text-[#FF004F] hover:bg-[#1a1a1a]"
                >
                  View Result
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
