import Layout from "layout";
import ProtectedRoute from "middleware/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import data from "./data";

const RoutesWrapper = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {data.protectedRoutes.map((item, index) => {
            return (
              <Route
                path={item.path}
                element={<item.element />}
                key={item.path}
              >
                {item.children
                  ? item.children.map((innerItem, innerIndex) => (
                      <Route
                        path={innerItem.path}
                        element={<innerItem.element />}
                        key={innerItem.path}
                      />
                    ))
                  : null}
              </Route>
            );
          })}
        </Route>
        {data.routes.map((item, index) => (
          <Route path={item.path} element={<item.element />} key={item.path}>
            {item.children
              ? item.children.map((innerItem, innerIndex) => (
                  <Route
                    path={innerItem.path}
                    element={<innerItem.element />}
                    key={innerItem.path}
                  />
                ))
              : null}
          </Route>
        ))}
      </Routes>
    </>
  );
};

export default RoutesWrapper;
