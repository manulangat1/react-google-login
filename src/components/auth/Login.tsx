import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  //   googleLogout,
} from "@react-oauth/google";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSuccessResponse = async (response: any) => {
  const request = await axios.post(
    "http://localhost:3000/api/v1/auth/google/registration",
    {
      token: response.credential,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  // console.log(response.data);
  if (response) alert("User created successfully");
  return request.data;
};

function Login() {
  const validationObject = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "enter a minimum of 8 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationObject,
    onSubmit: (values) => console.log(values),
  });
  return (
    <section
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h3"
        style={{
          marginBottom: "2rem",
        }}
      >
        {" "}
        react google oauth application{" "}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="string"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            borderRadius: "5px",
            width: "100%",
          }}
          placeholder="Enter your Email"
        >
          {" "}
        </TextField>
        <TextField
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            borderRadius: "5px",
            width: "100%",
          }}
          placeholder="Enter your password"
        >
          {" "}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
            margin: "0",
            padding: "1rem",
          }}
        >
          Submit
        </Button>
      </form>
      <section
        style={{
          marginTop: "2rem",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h6"> OR </Typography>
        <GoogleOAuthProvider
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        >
          <GoogleLogin
            onSuccess={onSuccessResponse}
            onError={() => {
              console.log("Login With Google Failed");
            }}
          />
        </GoogleOAuthProvider>
      </section>
    </section>
  );
}

export default Login;
