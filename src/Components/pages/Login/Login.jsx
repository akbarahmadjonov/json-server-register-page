import axios from "axios";
import { useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { UserContext } from "../../../Context/UserContext";

export const Login = () => {
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8313/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main className="app__content my-3">
        <div className="header__content">
          <h1 className="header__content__heading">Welcome Back</h1>
          <p className="header__content__subheading">
            Don't miss your next opportunity. Sign in to stay updated on your
            professional world.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <div className="form__input--floating">
            <label className="form__label--floating" id="label--email">
              Email or Phone
            </label>
            <input ref={emailRef} type="email" id="input--email" />
          </div>
          <div className="form__input--floating">
            <label className="form__label--floating" id="label--password">
              Password
            </label>
            <input ref={passwordRef} id="input--password" type="password" />
          </div>
          <div className="login__form_action_container login__form_action_container--multiple-actions">
            <button
              className="btn__primary--large from__button--floating"
              type="submit"
              aria-label="Sign in"
            >
              Sign in
            </button>
            <button
              className="btn__secondary--large from__button--floating"
              aria-label="Cancel"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="footer-app-content-actions">
          <div>
            <a>Forgot password?</a>
          </div>
          <p>
            New to LinkedIn?
            <a>Join now</a>
          </p>
        </div>
      </main>
    </>
  );
};
