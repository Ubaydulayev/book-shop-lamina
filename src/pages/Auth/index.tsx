import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import LoginBg from "assets/images/login-bg.jpg";
const Auth = () => {
  const location = useLocation();
  if (location.pathname === "/auth") return <Navigate to={"sign-up"} />;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-400 relative">
      <img
        src={LoginBg}
        className="absolute w-full h-full left-0 right-0 object-cover"
        alt="login bg"
      />
      <div className="relative max-w-[500px] w-full  shadow  bg-white rounded-xl overflow-hidden">
        <div className="flex">
          <NavLink
            to={"/auth/sign-up"}
            className={({ isActive }) =>
              `w-1/2 py-4 px-2 text-center ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:text-blue-500 transition-all duration-200"
              }`
            }
          >
            Sign Up
          </NavLink>
          <NavLink
            to={"/auth/sign-in"}
            className={({ isActive }) =>
              `w-1/2 py-4 px-2 text-center ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:text-blue-500 transition-all duration-200"
              }`
            }
          >
            Sign In
          </NavLink>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
