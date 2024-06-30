import { Spin } from "antd";
import { FC, useState } from "react";
import EyeOpen from "./../../assets/icons/eye.svg?react";
import EyeClose from "./../../assets/icons/eye-off.svg?react";
import { useNavigate } from "react-router-dom";
const url =
  import.meta.env.MODE == "production"
    ? import.meta.env.VITE_BASE_URL
    : import.meta.env.VITE_LOCAL_URL;
import "./index.sass";

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasVisible, setIsPasVisible] = useState<boolean>(false);

  const loginUser = async () => {
    setError("");
    setLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }

    try {
      const response = await fetch(url + 'login', requestOptions);
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.message);
      }
      const data = await response.json();
     
      if (data?.access_token) {
         localStorage.setItem('access_token', data.accessToken);
         navigate("/account/deposits/plans")
      } else {setError("Something went wrong")}
       
    } catch (error: any) {
      setError(error?.message || "Something went wrong")
    }
     setLoading(false);
  }

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
