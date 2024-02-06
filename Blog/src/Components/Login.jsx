import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth.js";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "./index";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const { register, handleSubmit } = useForm(); // this are the events both of them

  const Loginuser = async (data) => {
    seterror("");
    try {
      const session = await authService.loginuser(data); // on login it return us a session , and from this session we need to extrect data by using a getcurrentuser function
      if (session) {
        const userdata = await authService.getCurrentUser(); // extracting user data
        if (userdata) {
          dispatch(authlogin(userdata)); // updating the state
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error in Login at Login form->", error);
      seterror(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(Loginuser)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="text"
              label="Email:"
              placeholder="Enter Your Email Address"
              {...register("email", {
                // we we are not espreding this register than its value will be overwrite ...
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address", // this is called as REGEXRS , basicaly this are used for validation of email and all
                },
              })}
            />
            <Input
              type="text"
              label="Password"
              placeholder="Enter password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
