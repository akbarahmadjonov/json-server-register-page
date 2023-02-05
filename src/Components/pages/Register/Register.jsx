import axios from "axios";
import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { UserContext } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post("http://localhost:8313/register", {
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        if (data.status === 201) {
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
          <h1 className="header__content__heading">Welcome, Register</h1>
          <p className="header__content__subheading">Meet with the world!</p>
        </div>
        <form onSubmit={handleSubmit} className="login__form">
          <div className="form__input--floating">
            <label className="form__label--floating">First name</label>
            <input ref={firstNameRef} type="text" />
          </div>
          <div className="form__input--floating">
            <label className="form__label--floating">Last name</label>
            <input ref={lastNameRef} type="text" />
          </div>
          <div className="form__input--floating">
            <label className="form__label--floating">Email or Phone</label>
            <input ref={emailRef} type="email" />
          </div>
          <div className="form__input--floating">
            <label className="form__label--floating">Password</label>
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
            <Link to="/">Forgot password?</Link>
          </div>
          <Link to="/login">Already have an account?</Link>
        </div>
      </main>
    </>
  );
};
