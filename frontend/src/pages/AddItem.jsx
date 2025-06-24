import React, { useState } from "react";
import Alert from "../components/Alert";

export default function ItemForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price
    ) {
      setMessage("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/mongo/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Item submitted successfully!");
        setFormData({ name: "", description: "", price: "" }); // Reset form
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

          <div name="add_form" id="add_form">
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
                  value={formData.name}
                  placeholder="Enter Item Name"
                  onChange={handleChange}
                  required=""
                />
              </div>
              <div className="form-group col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <label>
                  Description <b className="require">*</b>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Enter Description"
                  required=""
                  onChange={handleChange}
                ></textarea>
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
                  value={formData.price}
                  min="0"
                  step="0.01"
                  placeholder="Enter Price"
                  onChange={handleChange}
                  required=""
                />
              </div>
            </div>
            <div className="form-footer">
              <div className="form-group col-md-4 col-sm-6 col-xs-12">
                <button
                  id="submit"
                  type="button"
                  className="btn btn-primary"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
