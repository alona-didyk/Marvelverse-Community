import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import facebook from "../../assets/icons/facebook.svg";
import google from "../../assets/icons/google.svg";
import { auth, provider } from "../../firebase";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "./../../context/AuthContext";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleToggle = (e) => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
        alert("Invalid email or password. Please try again.");
      });
  };

  const signInWithGoogle = () => {
    dispatch({ type: "LOGIN_START" });

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };
  // console.log(inputs);

  return (
    <div className="login">
      <form className="regist__form">
        <h2 className="regist__form--title">Login</h2>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="formInput">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eyeIcon" onClick={handleToggle}>
            {toggleEye ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
        </div>

        <button className="button" type="submit" onClick={handleLogin}>
          Login
        </button>

        <div className="regist__form--link">
          <span>Don't have an account? </span>
          <Link to="/login" className="regist__form--signup">
            SignUp
          </Link>
        </div>
        <div className="regist__line"></div>
        <div className="regist__media-options">
          <Link to="#" className="regist__form--facebook">
            <img src={facebook} alt="icon" className="regist__icon" />
            <span>Login with Facebook</span>
          </Link>
        </div>
        <div className="regist__media-options">
          <Link
            to="#"
            className="regist__form--facebook regist__form--google"
            onClick={signInWithGoogle}
          >
            <img src={google} alt="icon" className="googleImg" />
            <span>Login with Google</span>
          </Link>
        </div>
      </form>
    </div>
  );
};
