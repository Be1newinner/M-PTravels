import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { GrGoogle } from "react-icons/gr";
import { LuFacebook } from "react-icons/lu";

export default function Login() {
  return (
    <div>
      <div className="relative flex  max-lg:justify-center">
        <div className="max-xl:w-2/3 w-6/12 h-full max-lg:w-3/4 max-lg:rounded-lg py-24 max-xl:py-2 max-lg:mt-4 max-sm:px-4 max-sm:w-11/12 max-lg:bg-white max-2xl:px-10 max-2xl:py-8 px-16 gap-0 max-lg:z-50 ">
          <Link to="/" className="text-blue-600 text-sm font-medium flex items-center py-6">
            <IoIosArrowBack />
            Back To Home
          </Link>
          <h1 className="text-4xl font-medium py-2">Log in</h1>
          <div className="py-6">
            <Link
              to="https://myaccount.google.com/"
              className="text-white bg-red-500 flex py-4 justify-center items-center gap-4 rounded-xl"
            >
              Continue with Google
              <GrGoogle className="text-2xl" />
            </Link>
          </div>
          <div className="pb-10">
            <Link
              to="https://www.facebook.com/profile.php?id=100017542631967"
              className="text-white bg-blue-500 flex py-4 justify-center items-center gap-4 rounded-xl"
            >
              Continue with Facebook
              <LuFacebook className="text-2xl" />
            </Link>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-1/2 px-2">
              <hr />
            </div>
            Or
            <div className="w-1/2 px-2">
              <hr />
            </div>
          </div>
          <p className="text-center text-sm font-medium py-1">
            Sign up with your email address
          </p>
          <form>
            <div className="w-full py-6 rounded-2xl">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full h-12 outline-none bg-slate-200 px-4 text-black rounded"
              />
            </div>
            <div className="w-full rounded-2xl">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full h-12 outline-none bg-slate-200 px-4 text-black rounded"
              />
            </div>
            <div className="flex justify-end py-6 ">
              <input
                type="submit"
                value="Login"
                className="bg-blue-600 shadow-3xl py-2 px-5 text-white rounded-lg text-end hover:bg-gray-200 text-sm font-medium hover:text-black duration-700"
              />
            </div>
          </form>
        </div>
        <div className="max-lg:absolute max-lg:top-0 max-lg:w-full h-full max-lg:left-0 bg-black ">
            <img src="/login.jpg" alt="login" className="max-2xl:h-screen object-cover w-full"></img>
        </div>
      </div>
     
    </div>
  );
}
