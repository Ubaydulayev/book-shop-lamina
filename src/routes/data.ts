import Auth from "pages/Auth";
import SignIn from "pages/Auth/SignIn";
import SignUp from "pages/Auth/SignUp";
import Books from "pages/Books";
import { TRoutes } from "services/types";

const data: TRoutes = {
  protectedRoutes: [{ path: "/books", element: Books }],
  routes: [
    {
      path: "/auth",
      element: Auth,
      children: [
        { path: "sign-in", element: SignIn },
        { path: "sign-up", element: SignUp },
      ],
    },
  ],
};

export default data;
