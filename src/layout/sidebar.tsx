import { Button } from "@mui/material";
import CModal from "components/modal";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "utils";

const Sidebar = () => {
  const [logoutModal, setLogoutModal] = useState<boolean>(false);

  return (
    <div className="sticky top-0 max-w-[250px] w-full h-screen overflow-y-auto py-6 bg-gray-100">
      <div className="min-h-[120px] px-6">
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80"
          className="w-[120px] h-[120px] block mx-auto rounded-full"
          alt=""
        />
      </div>
      <div className="mt-10">
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                `px-6 py-2 w-full block  ${
                  isActive ? "bg-gray-300" : "hover:bg-gray-200"
                }`
              }
              to={"/"}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `px-6 py-2 w-full block  ${
                  isActive ? "bg-gray-300" : "hover:bg-gray-200"
                }`
              }
              to={"/books"}
            >
              Books
            </NavLink>
          </li>
          <li>
            <div
              onClick={() => setLogoutModal(true)}
              className="px-6 py-2 w-full block cursor-pointer hover:bg-gray-200"
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
      <CModal isOpen={logoutModal}>
        <div>
          <div className="font-medium text-center text-xl">
            Do you want to log out?
          </div>
          <div className="flex mt-6 gap-4">
            <Button
              className="w-1/2"
              variant="contained"
              color="error"
              onClick={() => setLogoutModal(false)}
            >
              Cancel
            </Button>
            <Button className="w-1/2" variant="contained" onClick={logout}>
              Confirm
            </Button>
          </div>
        </div>
      </CModal>
    </div>
  );
};

export default Sidebar;
