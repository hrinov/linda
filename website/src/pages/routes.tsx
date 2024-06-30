import { Redirect } from "./redirect";
import { LoginSignup } from "./LoginSignup";
import { Home } from "./Home";
import { RouteObject } from "react-router-dom";

const guestRoutes: RouteObject[] = [
  {
    element: <LoginSignup type={"login"}/>,
    path: "/login",
    index: true,
  },
  {
    element: <LoginSignup type={"signup"}/>,
    path: "/signup",
  },
  {
    Component: Redirect,
    path: "*",
  },
];

const accountRoutes: RouteObject[] = [
  {
    Component: Home,
    path: "/home",
    index: true,
  },
  {
    Component: Redirect,
    path: "*",
  },
];

export { guestRoutes, accountRoutes };
