import { useGetAll } from "hooks";
import RoutesWrapper from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { cookie } from "services";

function App() {
  useGetAll({
    url: "/myself",
    name: "me",
    queryOptions: {
      enabled: cookie.get("key") && cookie.get("secret") ? true : false,
    },
  });
  return (
    <div className="App">
      <ToastContainer />
      <RoutesWrapper />
    </div>
  );
}

export default App;
