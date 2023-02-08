import axios from "axios";
import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { UserContext } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, ErrorMessage, Field } from "formik";

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

  const validateSchema = Yup.object({
    firstNameRef: Yup.string().required("First name is required"),
    lastNameRef: Yup.string().required("Last name is required"),
    emailRef: Yup.string().required("Email is required"),
    passwordRef: Yup.string()
      .min(3, "Password must be 3 characters or long")
      .max(15, "Password must be 3 characters or long")
      .required("Password can't be blank "),
  });

  const initalValues = {
    firstNameRef: "",
    lastNameRef: "",
    emailRef: "",
    passwordRef: "",
  };

  return (
    <>
      <main className="app__content my-3">
        <div className="header__content">
          <h1 className="header__content__heading">Welcome, Register</h1>
          <p className="header__content__subheading">Meet with the world!</p>
        </div>
        <Formik
          validationSchema={validateSchema}
          initialValues={initalValues}
          onSubmit={handleSubmit}
        >
          <form className="login__form">
            <div className="form__input--floating">
              <label className="form__label--floating">First name</label>
              <Field name="firstNameRef" type="text" />
              <span className="error">
                <ErrorMessage name="firstNameRef" />
              </span>
            </div>
            <div className="form__input--floating">
              <label className="form__label--floating">Last name</label>
              <Field name="lastNameRef" type="text" />
              <span className="error">
                <ErrorMessage name="lastNameRef" />
              </span>
            </div>
            <div className="form__input--floating">
              <label className="form__label--floating">Email or Phone</label>
              <Field name="emailRef" type="email" />
              <span className="error">
                <ErrorMessage name="emailRef" />
              </span>
            </div>
            <div className="form__input--floating">
              <label className="form__label--floating">Password</label>
              <Field name="passwordRef" id="input--password" type="password" />
              <span className="error">
                <ErrorMessage name="passwordRef" />
              </span>
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
                type="submit"
                className="btn__secondary--large from__button--floating"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </Formik>
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
