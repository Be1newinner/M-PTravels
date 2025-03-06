/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { LoaderCircle } from "lucide-react";
import { selectAuth } from "../redux/selectors/authSelectors";
import { authLoginRequest } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    email: emailRole,
    role,
    loading,
    error,
    token,
  } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authLoginRequest({ email, password }));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle showPassword state
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="h-screen flex justify-center items-center w-full bg-custom-bg">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-slate-500 shadow-md w-[350px] py-6 px-6 rounded-lg"
      >
        <div>
          <div className="flex justify-center mb-4 items-center w-full">
            {/* <img src={LogoImage} alt="" className="w-[100px] h-auto" /> */}
          </div>
          <h2 className="text-center font-bold text-xl tracking-wider">
            M&P Travels Admin
          </h2>
          <h4 className="text-center text-2.5 uppercase font-light tracking-wider text-md">
            Login Dashboard
          </h4>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 px-4 border-b-2 border-b-solid outline-none rounded-sm border-2 border-slate-500 focus:border-red-500"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          {/* <label className="text-[10px]">Password</label> */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 px-4 border-b-2 border-b-solid outline-none w-full rounded-sm border-2 border-slate-500 focus:border-red-500"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-3.5 cursor-pointer text-xl text-gray-600 w-fit"
            >
              {showPassword ? <IoEyeOff size={15} /> : <IoEye size={15} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 flex items-center justify-center rounded-lg font-semibold cursor-pointer ${
            loading
              ? "bg-[#022061] bg-opacity-70 cursor-not-allowed"
              : "bg-[#022061] text-white"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle className="animate-spin text-blue-500 h-6 w-6" />
            </div>
          ) : (
            "LOGIN"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
