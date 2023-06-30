import { cookie } from "services";

const logout = () => {
  cookie.remove("key");
  cookie.remove("secret");
  window.location.reload();
};

export { logout };
