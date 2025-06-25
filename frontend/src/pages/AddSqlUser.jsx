import React, { useState } from "react";
import Alert from "../components/Alert";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';





export default function AddSqlUser() {
  



  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

const schema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must include at least one lowercase letter')
    .matches(/[A-Z]/, 'Must include at least one uppercase letter')
    .matches(/\d/, 'Must include at least one number')
    .matches(/[@$!%*?&]/, 'Must include at least one special character')
    .required('Password is required'),
});
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(schema),
});



const onSubmit = async(data) => {

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/mysql/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Item submitted successfully!");
       
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      setMessage(`Network error: ${error.message}`);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 2000);
      setLoading(false);
    }
  };

  return (
    <div className="main_page">
      <div className="page_title">
        <h3>Form Template 2</h3>
      </div>
      <div className="page_body">
        <div className="page_sec">
          {message && (
            <Alert message={message}/>
          )}

         <form onSubmit={handleSubmit(onSubmit)} 
 name="add_form" id="add_form">
            <div className="row flex_wrap">
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                   Name <b className="require">*</b>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                 
                   {...register("name")}

                  placeholder="Enter Name"

                 
                />
                {errors.name && <p className="error">{errors.name.message}</p>}

              </div>
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Email <b className="require">*</b>
                </label>
                <input
                type="text"
                  className="form-control"
                  name="email"
                  id="email"
                
                  placeholder="Enter email"
                 
                   {...register("email")}

                  
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

              </div>
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Password <b className="require">*</b>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  name="password"
                  id="password"
                   {...register("password")}
                  placeholder="Enter password"
       
                 
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

              </div>
            </div>
            <div className="form-footer">
              <div className="form-group col-md-4 col-sm-6 col-xs-12">
                {/* <button
                  id="submit"
                  type="button"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button> */}
                <button type="submit" disabled={isSubmitting}>  {loading ? "Submitting..." : "Submit"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
