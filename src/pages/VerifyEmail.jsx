import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify-email?token=${token}`);
        setMessage("Email verified! You can now log in.");
        setTimeout(() => navigate("/"), 3000);
      } catch (err) {
        setMessage("Verification failed.");
      }
    };

    if (token) verify();
    else setMessage("Invalid verification link.");
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-xl">{message}</div>
  );
};

export default VerifyEmail;
