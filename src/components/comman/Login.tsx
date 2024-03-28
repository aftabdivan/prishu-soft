import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../../config";

const Login = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    organizationUrl: Yup.string().min(2, "Too Short!").required("Required"),
  });

  const handleSubmit = (values: {
    email: string;
    password: string;
    organizationUrl: string;
  }) => {
    axios
      .post(`${config.baseURL}auth/login`, values)
      .then((data) => {
        const response = data.data;
        console.log("response", response);
        if (response.success) {
          localStorage.setItem("auth_token", response.auth_token);
          navigate("/organization");
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "", organizationUrl: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <label className="sr-only">Email</label>
            <Field name="email" className="form-control col-md-4" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label className="sr-only">Password</label>
            <Field name="password" className="form-control col-md-4" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <label className="sr-only">Url</label>
            <Field
              name="organizationUrl"
              type="url"
              className="form-control col-md-4"
            />
            {errors.organizationUrl && touched.organizationUrl ? (
              <div>{errors.organizationUrl}</div>
            ) : null}
            <button type="submit" className="btn btn-primary mb-2 mt-2">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
