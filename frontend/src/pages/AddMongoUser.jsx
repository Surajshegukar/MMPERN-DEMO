import React, { useState } from "react";
import Alert from "../components/Alert";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddMongoUser() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const schema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dob: Yup.date().required("Date of birth is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      .matches(/[a-z]/, "One lowercase letter required")
      .matches(/[A-Z]/, "One uppercase letter required")
      .matches(/\d/, "One number required")
      .matches(/[@$!%*?&]/, "One special character required")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    profilePhoto: Yup.mixed().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    for (const key in data) {
      if (key === "profilePhoto" && data.profilePhoto?.[0]) {
        formData.append(key, data.profilePhoto[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const response = await fetch("http://localhost:3000/mongodb/users", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("User registered successfully!");
        reset(); // Clear form
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (err) {
      setMessage(`Network error: ${err.message}`);
    } finally {
      setTimeout(() => setMessage(""), 3000);
      setLoading(false);
    }
  };

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>User Registration</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {message && <Alert message={message} />}
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row flex_wrap">
              {[
                { name: "firstName", label: "First Name", type: "text" },
                { name: "lastName", label: "Last Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "dob", label: "Date of Birth", type: "date" },
                { name: "mobileNumber", label: "Mobile Number", type: "text" },
                { name: "password", label: "Password", type: "password" },
                { name: "address", label: "Address", type: "text" },
                { name: "profilePhoto", label: "Profile Photo", type: "file" },
              ].map(({ name, label, type }) => (
                <div className="form-group col-xl-4 col-md-6 col-sm-12" key={name}>
                  <label>
                    {label} <b className="require">*</b>
                  </label>
                  <input
                    type={type}
                    className="form-control"
                    {...register(name)}
                    {...(type === "file" ? {} : { autoComplete: "off" })}
                  />
                  {errors[name] && <p className="error">{errors[name].message}</p>}
                </div>
              ))}
            </div>
            <div className="form-footer">
              <div className="form-group col-md-4 col-sm-6">
                <button type="submit" disabled={isSubmitting}>
                  {loading ? "Submitting..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}