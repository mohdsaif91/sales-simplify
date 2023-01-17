import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  checkIfAnyError,
  minMaxLength,
  uniqueId,
  userExists,
  validEmail,
} from "../../../helper";
import { loginUser } from "../../../Redux/Slice/user";

import "./Login.scss";

export const Login = ({ from }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    uname: "",
  });
  const [formDataError, setFormDataError] = React.useState({
    email: "",
    password: "",
    uname: "",
    error: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    switch (name) {
      case "email":
        if (!inputValue || validEmail(inputValue)) {
          setFormDataError((formDataError) => ({
            ...formDataError,
            email: "Entered email address is wrong",
          }));
        } else {
          setFormDataError((formDataError) => ({
            ...formDataError,
            email: "",
          }));
        }
        if (inputValue.length <= 40) {
          setFormData((formData) => ({ ...formData, email: inputValue }));
        }

        break;
      case "uname":
        if (!inputValue) {
          setFormDataError((formDataError) => ({
            ...formDataError,
            uname: "Username is required",
          }));
        } else {
          setFormDataError((formDataError) => ({
            ...formDataError,
            uname: "",
          }));
        }
        if (inputValue.length <= 40) {
          setFormData((formData) => ({ ...formData, uname: inputValue }));
        }

        break;

      case "password":
        if (minMaxLength(inputValue, 6)) {
          setFormDataError((formData) => ({
            ...formDataError,
            password: "Password must be between 6 to 15 characters",
          }));
        } else {
          // setValue({ ...value, password: inputValue });
          setFormDataError((formData) => ({
            ...formDataError,
            password: "",
          }));
        }
        if (inputValue.length <= 15) {
          setFormData((formData) => ({ ...formData, password: inputValue }));
        }

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      uname: "",
    });
    setFormDataError({
      email: "",
      password: "",
      uname: "",
      error: "",
    });
  }, [from]);

  const checkRequiredFiled = () => {
    let valid = true;

    if (formData.email.trim() === "") {
      setFormDataError((formDataError) => ({
        ...formDataError,
        email: "Email is Required",
      }));
      valid = false;
    }
    if (formData.password.trim() === "") {
      setFormDataError((formDataError) => ({
        ...formDataError,
        password: "Password is Required",
      }));
      valid = false;
    }

    if (from == "Signup") {
      if (formData.uname.trim() === "") {
        setFormDataError((formDataError) => ({
          ...formDataError,
          uname: "Username is Required",
        }));
        valid = false;
      }
    }

    return valid;
  };

  const handleSubmit = () => {
    const isFormValid = checkRequiredFiled();
    const { error, ...res } = formDataError;
    const isError = checkIfAnyError(res);
    if (isFormValid && isError) {
      if (from == "Signup") {
        navigate("/Login");
        const getAllUsers =
          JSON.parse(localStorage.getItem("registered-users")) || [];

        if (getAllUsers.length > 0) {
          getAllUsers.push({
            email: formData.email,
            password: formData.password,
            id: uniqueId(),
            username: formData.uname,
          });
          localStorage.setItem("registered-users", JSON.stringify(getAllUsers));
        } else {
          localStorage.setItem(
            "registered-users",
            JSON.stringify([
              {
                email: formData.email,
                password: formData.password,
                id: uniqueId(),
                username: formData.uname,
              },
            ])
          );
        }
      } else {
        const getAllUsers =
          JSON.parse(localStorage.getItem("registered-users")) || [];
        const hj = [];
        const userFound = getAllUsers.find(
          (f) => f.email === formData.email && f.password === formData.password
        );
        console.log(userFound, " Found User");
        if (userFound) {
          console.log("found user");
          navigate("/");
          dispatch(
            loginUser({
              ...userFound,
            })
          );
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              ...userFound,
            })
          );
        } else {
          setFormDataError((formDataError) => ({
            ...formDataError,
            error: "Check your credentials or User does not exist",
          }));
        }
      }
    }
  };

  const renderForm = (
    <div className="form">
      <div className="input-container">
        <label>Email </label>
        <input
          autocomplete="off"
          type="email"
          name="email"
          onChange={handleChange}
          onBlur={handleChange}
        />
        {formDataError.email && (
          <div className="error">{formDataError.email}</div>
        )}
      </div>

      {from == "Signup" && (
        <div className="input-container">
          <label>Username </label>
          <input
            autocomplete="off"
            type="text"
            name="uname"
            onChange={handleChange}
            onBlur={handleChange}
          />
          {formDataError.uname && (
            <div className="error">{formDataError.uname}</div>
          )}
        </div>
      )}

      <div className="input-container">
        <label>Password </label>
        <input
          autocomplete="off"
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleChange}
        />
        {formDataError.password && (
          <div className="error">{formDataError.password}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign {`${from == "Signup" ? "Up" : "In"}`}</div>
        {renderForm}
        {from == "Signup" ? (
          <Link to="/Login">Login</Link>
        ) : (
          <Link to="/SignUp">Sign Up</Link>
        )}
        {formDataError.error && (
          <div className="error text-center">{formDataError.error}</div>
        )}
        <div className="button-container">
          <button className="btn" onClick={handleSubmit}>
            Sign {`${from == "Signup" ? "Up" : "In"}`}
          </button>
        </div>
      </div>
    </div>
  );
};
