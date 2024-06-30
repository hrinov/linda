import { Spin } from "antd";
import { FC, useState } from "react";
import EyeOpen from "./../../assets/icons/eye.svg?react";
import EyeClose from "./../../assets/icons/eye-off.svg?react";
import { useNavigate } from "react-router-dom";
import "./index.sass";

export const Login: FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasVisible, setIsPasVisible] = useState<boolean>(false);

  const loginUser = async () => {
    setError("");
    setLoading(true);
    const data = { email, password };

    // const response: MeResponse = await requestHandler("login", "POST", data);
    console.log(import.meta.env.PROD ? import.meta.env.VITE_BASE_URL : "/api/");
    // setTimeout(() => {
    //   if (response?.success) {
    //     const { access_token } = response.data!;

    //     window.localStorage.setItem("accessToken", access_token);
    //     window.localStorage.setItem("refreshToken", refresh_token);

    //     setLoading(false);
    //     navigate("/account/deposits/plans");
    //   } else {
    //     setLoading(false);
    //     response?.message && setError(response?.message);
    //   }
    // }, 1000);
  };

  const createInput = (
    value: string,
    placeholder: string,
    onChange: (e: any) => void
  ) => (
    <>
      <input
        className={loading ? "opacity" : ""}
        {...{ value, placeholder, onChange }}
        type={
          isPasVisible ? "text" : placeholder == "email" ? "text" : "password"
        }
      />
      {!isPasVisible ? (
        <EyeOpen
          onClick={() => setIsPasVisible(!isPasVisible)}
          className={loading ? "opacity" : ""}
        />
      ) : (
        <EyeClose
          onClick={() => setIsPasVisible(!isPasVisible)}
          className={loading ? "opacity" : ""}
        />
      )}
    </>
  );

  const isFormNotFilled = !email || !password;

  return (
    <section className="login-page">
      <button
        children={"Sign Up"}
        className={"signup-btn"}
        onClick={() => navigate("/signup")}
      />

      <div className="inputs-wrapper">
        <div className="title-wrapper" children={"Login"} />
        {createInput(email, "email", (e) => setEmail(e.target.value))}
        {createInput(password, "password", (e) => setPassword(e.target.value))}
        <div
          className="ok-btn"
          onClick={() => !isFormNotFilled && loginUser()}
          children={"NEXT"}
        />
        <div
          className={`error-message ${!error && "transparent"}`}
          children={error}
        />
        {loading && <div className="spin-wrapper" children={<Spin />} />}
      </div>
    </section>
  );
};
