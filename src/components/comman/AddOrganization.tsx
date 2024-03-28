import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config";

const AddOrganization = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    organizationName: Yup.string().required("Required"),
    organizationShortName: Yup.string()
      .min(2, "Too Short!")
      .required("Required"),
    organizationURL: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      )
      .required("Please enter url"),
    organizationLOGO: Yup.string().min(2, "Too Short!").required("Required"),
  });

  return (
    <div className="container">
      <Formik
        initialValues={{
          organizationName: "",
          organizationShortName: "",
          organizationURL: "",
          organizationLOGO: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          axios
            .post(`${config.baseURL}Organization/addOrganization`, values)
            .then((data) => {
              alert(data.data.message);
              navigate("/organization");
            })
            .catch((error) => console.log(error));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <label className="sr-only">Organization Name</label>
            <Field name="organizationName" className="form-control col-md-4" />
            {errors.organizationName && touched.organizationName ? (
              <div>{errors.organizationName}</div>
            ) : null}
            <label className="sr-only">Organization Short Name</label>
            <Field
              name="organizationShortName"
              className="form-control col-md-4"
            />
            {errors.organizationShortName && touched.organizationShortName ? (
              <div>{errors.organizationShortName}</div>
            ) : null}
            <label className="sr-only">Organization URL</label>
            <Field name="organizationURL" className="form-control col-md-4" />
            {errors.organizationURL && touched.organizationURL ? (
              <div>{errors.organizationURL}</div>
            ) : null}
            <label className="sr-only">Logo</label>
            <Field name="organizationLOGO" className="form-control col-md-4" />
            {errors.organizationLOGO && touched.organizationLOGO ? (
              <div>{errors.organizationLOGO}</div>
            ) : null}
            <button type="submit" className="btn btn-primary m-2">
              Save
            </button>
            <button
              className="btn btn-secondary m-2"
              onClick={() => {
                navigate("/organization");
              }}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOrganization;
