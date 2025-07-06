import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Navbar from "@/shared/Navbar";
import { QUESTIONS_API_ENDPOINT, USER_API_ENDPOINT } from "@/utlis/constants";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Profile() {
  const [name, setName] = useState("");
  const [email] = useState("");
  const [role] = useState("");
  const [quizResults, setQuizResults] = useState([]);
  const [password, setPassword] = useState("");

  const {user} = useSelector(store => store.auth)

  const handleUpdate = async () => {
    try {
      const payload = {
        name,
      };

      if (password.trim()) {
        const oldPassword = prompt("Enter your old password:");
        if (!oldPassword) return toast.error("Old password is required.");

        payload.oldPassword = oldPassword;
        payload.newPassword = password;
      }

      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update/${user._id}`,
        payload,
        { withCredentials: true }
      );

      toast.success("Profile updated successfully!");
      setPassword(""); // Clear password field
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`${QUESTIONS_API_ENDPOINT}/results`,
          { withCredentials: true, }
        );
        setQuizResults(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch quiz results:", err.response?.data || err.message);
      }
    };

    fetchResults();
  }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 py-10">
        <h1 className="text-3xl font-bold text-[#00FFFF] font-[Orbitron] mb-8 drop-shadow-[0_0_10px_#00FFFF] text-center">
          Profile Settings
        </h1>

        {
          user?(
            <div className="max-w-xl mx-auto bg-[#111] p-8 rounded-xl border border-[#00FFFF] shadow-[0_0_20px_#00FFFF40] space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-[#FF004F]">
              Name
            </Label>
            <Input
              id="name"
              className="bg-[#222] text-white mt-1 placeholder-white"
              value={name}
              placeholder={user.name}
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
              className="bg-[#222] text-white mt-1 cursor-not-allowed placeholder-white"
              placeholder={user.email}
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
              className="bg-[#222] text-white mt-1 cursor-not-allowed placeholder-white"
              value={role}
              placeholder={user.role}
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
          ):(
            <div>

            </div>
          )
        }

        {/* ✅ Quiz History */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-[#00FFFF] mb-6 font-[Orbitron] drop-shadow-[0_0_10px_#00FFFF]">
            Your Quiz History
          </h2>

          {quizResults.length === 0 ? (
            <p className="text-white/60 text-center">No quiz attempts yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {quizResults.map((attempt, i) => {
                const percentage = Math.round((attempt.score / attempt.total) * 100);
                const isGoodScore = percentage >= 70;

                return (
                  <div
                    key={attempt._id}
                    className="bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#FF004F] rounded-xl shadow-[0_0_15px_#FF004F50] p-6 transition hover:scale-[1.01]"
                  >
                    <div className="mb-2">
                      <h3 className="text-xl font-semibold text-[#FF004F]">
                        {attempt.course?.title || "Untitled Course"} – Week {attempt.week?.number}
                      </h3>
                      <p className="text-sm text-white/60">
                        Attempted on:{" "}
                        {new Date(attempt.submittedAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>

                    <div className="mt-4">
                      <p className="text-white/90 mb-1 text-sm">
                        Score:{" "}
                        <span className={isGoodScore ? "text-green-400" : "text-red-400"}>
                          {attempt.score}/{attempt.total} ({percentage}%)
                        </span>
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>


      </div>
    </>
  );
}
