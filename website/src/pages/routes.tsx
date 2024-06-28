import { Redirect } from "./redirect";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Home } from "./Home";
import { RouteObject } from "react-router-dom";

const guestRoutes: RouteObject[] = [
  {
    Component: Login,
    path: "/login",
    index: true,
  },
  {
    Component: SignUp,
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
