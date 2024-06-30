import { guestRoutes, accountRoutes } from "./pages/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./app.sass";
import { FC, useEffect, useState } from "react";
import { Spin } from "antd";
const url =
  import.meta.env.MODE == "production"
    ? import.meta.env.VITE_BASE_URL
    : import.meta.env.VITE_LOCAL_URL;

const Router: FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  const getUser = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(url + "me", requestOptions);
    if (!response.ok) {
      setLoading(false);
      return;
    }

    const { user } = (await response.json()) as { user: User };
    setUser(user);
    setLoading(false);
  };

  const router = createBrowserRouter(user ? accountRoutes : guestRoutes);

  useEffect(() => {
    getUser();
  }, []);

  return loading ? (
    <div className="loading-page">
      <Spin />
    </div>
  ) : (
    <RouterProvider router={router} />
  );
};

const App: FC = () => <Router />;

export default App;
