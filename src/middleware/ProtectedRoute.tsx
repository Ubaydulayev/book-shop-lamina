import { Navigate } from "react-router-dom";
import { cookie } from "services";
type ProtectedRouteProps = { children: JSX.Element };

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = cookie.get("key") && cookie.get("secret");
  return isAuthenticated ? children : <Navigate to={"/auth/sign-up"} />;
};

export default ProtectedRoute;
