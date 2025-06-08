import React, { useState } from "react";
import { Global } from "../components/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { setData, setLoggedIn, setLoggedOut, GetData } = Global();
  const Navigate = useNavigate();
  const [user, setUser] = useState("sign up");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const submitHandle = async (e) => {
    e.preventDefault();
     axios.defaults.withCredentials=true
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/register",
        { name, password, email },
        { headers: { "Content-Type": "Application/json" } }
      );
      if (user =='sign up') {
        toast.success(data.message||'register successfully');
        Navigate("/");
        setData(true);
        GetData
      } else {
       const { data } = await axios.post(
        "http://localhost:3000/api/login",
        { password, email },
        { headers: { "Content-Type": "Application/json" },withCredentials: true, }
      );
      if (user=='login') {
        toast.success(data.message||'login successfully');
        Navigate("/");
        setData(true);
        GetData
      } else {
        toast.error("already login");
      }
      }
    } catch (error) {
      toast.error(error.message || "something went wrong!");
    }
    
  
    
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-950">
      <div>
        <h1
          className="text-pink-500 text-3xl capitalize font-bold bg-gradient-to-b from-slate-700 to-slate-500 bg-clip-text text-transparent p-3 cursor-pointer font-sans"
          onClick={() => Navigate("/")}
        >
          logo
        </h1>
      </div>
      <h1 className="text-3xl text-white text-center p-4 tracking-wider">
        Authentiaction
      </h1>
      <div className=" w-full  shadow-lg p-8 ">
        <div className="shadow-lg bg-gray-900 p-8  text-2xl tracking-wider rounded-lg sm:max-w-[40%] m-auto">
          <p className="text-center ">
            {user == "sign up" ? "create new account" : "login your account"}
          </p>
          <div>
            <form onSubmit={submitHandle}>
              <div className="flex flex-col justify-center items-center mt-4 ">
                {user == "sign up" && (
                  <div>
                    <input
                      type="text"
                      className=" w-full p-3 m-3 rounded-full text-sm bg-transparent border"
                      placeholder="name"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <input
                    type="password"
                    className=" w-full p-3 m-3 rounded-full text-sm bg-transparent border"
                    placeholder="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className=" w-full p-3 m-3 rounded-full text-sm bg-transparent border"
                    placeholder="email"
                    required
                 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary m-6">{user}</button>
              </div>
            </form>
          </div>
          <div className="text-center flex justify-start items-center">
            {user == "sign up" ? (
              <p className="text-blue-800 text-sm p-4 ">
                Already have an Account{" "}
                <span
                  className="text-blue-800 text-sm underline cursor-pointer px-2"
                  onClick={() => setUser("login")}
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-blue-800 text-sm flex p-4 ">
                Create an new Account?
                <span
                  className="text-blue-800 text-sm underline cursor-pointer px-2"
                  onClick={() => setUser("sign up")}
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
