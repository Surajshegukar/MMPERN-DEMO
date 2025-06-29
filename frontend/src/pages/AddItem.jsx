import React, { useState } from "react";
import Alert from "../components/Alert";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';





export default function ItemForm() {
  



  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const schema = Yup.object({
  name: Yup.string().required('Item Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
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
      const response = await fetch("http://localhost:3000/mongo/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
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
                  Item Name <b className="require">*</b>
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                 
                   {...register("name")}

                  placeholder="Enter Item Name"

                 
                />
                {errors.name && <p className="error">{errors.name.message}</p>}

              </div>
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Description <b className="require">*</b>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                
                  placeholder="Enter Description"
                 
                   {...register("description")}

                  
                ></textarea>
                {errors.description && <p className="error">{errors.description.message}</p>}

              </div>
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Price <b className="require">*</b>
                </label>
                <input
                  autoComplete="off"
                  type="number"
                  className="form-control"
                  name="price"
                  id="price"
                   {...register("price")}

                  min="0"
                  step="0.01"
                  placeholder="Enter Price"
       
                 
                />
                {errors.price && <p className="error">{errors.price.message}</p>}

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
