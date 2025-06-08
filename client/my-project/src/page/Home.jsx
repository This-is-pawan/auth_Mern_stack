import React from "react";
import { useNavigate } from "react-router-dom";
import { Global } from "../components/AppContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
import img from '../assets/14Sl.gif'
const Home = () => {
  const navigate = useNavigate();
  const { data, setData } = Global();

  const logout = async () => {
    // axios.defaults.withCredentials = true;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/logout",
        {},
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message || "Logout user");
        setData(null);
        navigate("/");
      } else {
        toast.error(message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || error.message || "Logout failed");
    }
  };

  return (
    <div>
      <div className="flex justify-around items-center bg-pink-300 p-4">
        <h1 className="text-pink-500 text-3xl font-bold bg-gradient-to-b from-slate-700 to-slate-500 bg-clip-text text-transparent">
          logo
        </h1>

        {data?.userData?.name ? (
  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-800 capitalize font-bold">
    {data.userData.name.charAt(0)}
  </div>
) : (
  <img src={img} className="w-10 h-10 rounded-full" alt="User Avatar" />
)} 


        <div>
          {data ? (
            <button
              className="btn rounded-full tracking-widest"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn rounded-full tracking-widest"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
