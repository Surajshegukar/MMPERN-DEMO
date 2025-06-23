import React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";
import "jquery-validation";

function AddItem() {
  useEffect(() => {
    // Initialize jQuery validation when component mounts
    $("#addForm").validate({
      rules: {
        item_name: {
          required: true,
          minlength: 2,
        },
        description: {
          required: true,
          minlength: 5,
        },
        price: {
          required: true,
          number: true,
          min: 0,
        },
      },
      messages: {
        item_name: {
          required: "Item Name is required",
          minlength: "Item Name must be at least 2 characters",
        },
        description: {
          required: "Description is required",
          minlength: "Description must be at least 5 characters",
        },
        price: {
          required: "Price is required",
          number: "Please enter a valid number",
          min: "Price must be 0 or more",
        },
      },
      errorClass: "text-red-500 text-sm mt-1",
      errorElement: "span",

      highlight: function (element) {
        $(element).addClass("border-red-500");
      },
      unhighlight: function (element) {
        $(element).removeClass("border-red-500");
      },
      submitHandler: function (form) {
        const formData = {
          item_name: $("#item_name").val(),
          description: $("#description").val(),
          price: $("#price").val(),
        };

        fetch("http://localhost:3000/api/mongo/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to submit");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Form submitted successfully:", data);
            // Optional: reset form or show success message
            form.reset();
          })
          .catch((error) => {
            console.error("Submission error:", error);
            alert("Failed to submit. Please try again.");
          });
      },
    });
  }, []);

  const [formData, setFormData] = React.useState({
    item_name: "",
    description: "",
    price: 0,
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div class="main_page">
        <div class="page_title">
          <h3>Form Template 2</h3>
        </div>
        <div class="page_body">
          <div class="page_sec">
            <form
              method="post"
              name="add_form"
              id="add_form"
              enctype="multipart/form-data"
              novalidate="novalidate"
            >
              <div class="row flex_wrap">
                {/* name , description and price */}

                <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>
                    Item Name <b class="require">*</b>
                  </label>
                  <input
                    autocomplete="off"
                    type="text"
                    class="form-control"
                    name="item_name"
                    id="item_name"
                    value=""
                    placeholder="Enter Item Name"
                    onChange={handleChange}
                    required=""
                  />
                </div>
                <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>
                    Description <b class="require">*</b>
                  </label>
                  <textarea
                    class="form-control"
                    name="description"
                    id="description"
                    placeholder="Enter Description"
                    required=""
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <label>
                    Price <b class="require">*</b>
                  </label>
                  <input
                    autocomplete="off"
                    type="number"
                    class="form-control"
                    name="price"
                    id="price"
                    value=""
                    placeholder="Enter Price"
                    onChange={handleChange}
                    required=""
                  />
                </div>

                {/* <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Customer Name <b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="customer_name" id="customer_name" value="" placeholder="Enter Customer Name" onChange={handleChange} required="" />
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Category<b class="require">*</b></label>
                            <select class="form-control" name="category" id="category" value="" placeholder="Select Category">
                                <option value="">select category</option>
                                <option value="0">category1</option>
                                <option value="1">category2</option>
                            </select>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Region <b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="region" id="region" value="" placeholder="Enter Region"/>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Contact Person <b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="contact_person" id="contact_person" value="" placeholder="Enter Contact Person Name"/>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Contact Person Designation<b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="contact_person_designation" id="contact_person_designation" value="" placeholder="Enter Contact Person Designation"/>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Inquiry Level<b class="require">*</b></label>
                            <select class="form-control" name="inquiry_level" id="inquiry_level" value="" placeholder="Select Inquiry Level">
                                <option value="">select inquiry level</option>
                                <option value="0">level1</option>
                                <option value="1">level2</option>
                            </select>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Project Proposal Schedule<b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="project_proposal_schedule" id="project_proposal_schedule" value="" placeholder="Enter Project Proposal Schedule"/>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Status<b class="require">*</b></label>
                            <select class="form-control" name="status" id="status" value="" placeholder="Select status">
                                <option value="">select status</option>
                                <option value="0">status1</option>
                                <option value="1">status2</option>
                            </select>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Qnt<b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="qnt" id="qnt" value="" placeholder="Enter Qnt"/>
                        </div>

                        <div class="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <label>Source<b class="require">*</b></label>
                            <input autocomplete="off" type="text" class="form-control" name="source" id="source" value="" placeholder="Enter Source"/>
                        </div>

                        <div class="form-group  col-xl-12 col-md-12 col-sm-12 col-xs-12">
                            <label>Description<b class="require">*</b></label>
                            <textarea class="form-control" name="description" id="description" placeholder="Enter Description" required=""></textarea>
                        </div> */}
              </div>
              <div className="form-footer">
                <div class="form-group col-md-4 col-sm-6 col-xs-12">
                  <button id="submit" type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
