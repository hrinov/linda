import { guestRoutes, accountRoutes } from "./pages/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.sass";
import { FC } from "react";

const Router: FC = () => {
  const router = createBrowserRouter(
    !localStorage.getItem("accessToken") ? accountRoutes : guestRoutes
  );
  console.log(localStorage.getItem("accessToken"));
  return <RouterProvider router={router} />;
};

const App: FC = () => <Router />;

export default App;
