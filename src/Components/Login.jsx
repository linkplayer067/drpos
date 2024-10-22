import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
     const [formData, setFormData] = useState({
       email: "",
       password: "",
     });
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const navigate = useNavigate();
    
    const handleSignIn = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/createform");    
    };
    
    
  const handleCreateAccount = () => {
    navigate("/signup");
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-20 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-[90%] ">
        <div className="text-center mb-6">
          <img src="/logo-drpos.png" alt="" className="m-auto" />
          <p className="text-gray-500 pt-4">Hello! Log in with your email.</p>
        </div>
        <form onSubmit={handleSignIn} className="">
          <div className="mb-8 w-[40%] m-auto">
            <label htmlFor="email" className="block text-gray-700 pb-3">
              Email address:
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email"
            />
          </div>
          <div className="mb-4 relative w-[40%] m-auto ">
            <label htmlFor="password" className="block text-gray-700 pb-3">
              Password:
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-14 cursor-pointer"
            >
              {showPassword ? <FaEye /> : <GoEyeClosed />}
            </span>
          </div>
          <button
                      type="submit"
            className=" items-center gap-2 w-[40%] flex justify-center m-auto mt-8 bg-green-400 text-white py-4 text-xl rounded-lg hover:bg-green-500 transition duration-300"
          >
            <FaArrowRight />
            SIGN IN
          </button>
        </form>

        <div className="text-center my-4">
          <span className="text-gray-500">OR</span>
        </div>
        <button
            onClick={handleCreateAccount}
          className=" items-center gap-2 w-[40%] flex justify-center m-auto mt-8 bg-blue-500 text-white py-5 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          <BsFillPersonPlusFill className="text-2xl" />
          CREATE NEW ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Login;
