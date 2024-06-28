import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = () => {
  const navigate = useNavigate();
  const isUserAuthorized = !localStorage.getItem("accessToken");

  useEffect(() => {
    if (isUserAuthorized) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [isUserAuthorized]);

  return <></>;
};
