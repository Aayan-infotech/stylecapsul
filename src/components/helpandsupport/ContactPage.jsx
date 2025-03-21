import React, { useState } from "react";
import "../../../src/components/helpandsupport/contactuse.scss";
import axios from "axios";
import { apiUrl } from "../../../apiUtils";
import { showErrorToast, showSuccessToast } from "../toastMessage/Toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [btnLoader, setBtnLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContactPageSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setBtnLoader(true);

    try {
      const response = await axios.post(apiUrl("api/contact/post-query"), formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        showSuccessToast(response.data.message || "Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
      } else {
        showErrorToast(`Error: ${response.data.message || "Something went wrong."}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Unable to send your message.";
      showErrorToast(`Error: ${errorMessage}`);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="container w-75">
        <form className="form-responsive" onSubmit={handleContactPageSubmit}>
          <div className="mb-2">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              className={`form-control rounded-pill ${errors.name ? "is-invalid" : ""}`}
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control rounded-pill ${errors.email ? "is-invalid" : ""}`}
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              className={`form-control ${errors.message ? "is-invalid" : ""}`}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleInputChange}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-dark rounded-pill w-25 p-2 text-center"
              disabled={btnLoader}
            >
              {btnLoader ? (
                <span>
                  <i className="fa-solid fa-spinner fa-spin me-2"></i>
                  Submitting...
                </span>
              ) : (
                "Contact Us"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
