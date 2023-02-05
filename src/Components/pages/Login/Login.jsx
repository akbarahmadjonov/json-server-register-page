import axios from "axios";
import { useState, useRef } from "react";

export const Login = () => {
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
          localStorage.setItem("token", data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <main class="app__content my-3">
        <div class="header__content">
          <h1 class="header__content__heading">Welcome Back</h1>
          <p class="header__content__subheading">
            Don't miss your next opportunity. Sign in to stay updated on your
            professional world.
          </p>
        </div>
        <form onSubmit={handleSubmit} class="login__form">
          <div class="form__input--floating">
            <label class="form__label--floating" id="label--email">
              Email or Phone
            </label>
            <input ref={emailRef} type="email" id="input--email" />
          </div>
          <div class="form__input--floating">
            <label class="form__label--floating" id="label--password">
              Password
            </label>
            <input ref={passwordRef} id="input--password" type="password" />
          </div>
          <div class="login__form_action_container login__form_action_container--multiple-actions">
            <button
              class="btn__primary--large from__button--floating"
              type="submit"
              aria-label="Sign in"
            >
              Sign in
            </button>
            <button
              class="btn__secondary--large from__button--floating"
              aria-label="Cancel"
            >
              Cancel
            </button>
          </div>
        </form>
        <div class="footer-app-content-actions">
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
