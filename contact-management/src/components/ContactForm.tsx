import React, { useEffect, useState } from "react";
import {
  createContact,
  getContactDetails,
  updateContact,
} from "../services/contactService";
import { ContactModel } from "../models/ContactModel";
import { useNavigate, useParams } from "react-router-dom";

const ContactForm: React.FC = () => {

  // Initial state for contact form
  const [contact, setContact] = useState<ContactModel>({
    contactId: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    remarks: "",
    dateOfBirth: "",
  });


  //State for form validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });
  
  // Get 'id' from URL if editing (Retrieved Data)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();


  // Load contact if editing
  useEffect(() => {
    if (id) {
      loadContact(parseInt(id));
    }
  }, [id]);


  // Fetch contact details for edit
  const loadContact = async (contactId: number) => {
    try {
      const data = await getContactDetails(contactId);
      data.dateOfBirth = data.dateOfBirth.split("T")[0]; // Format date
      setContact(data);
    } catch (error) {
      console.error("Error loading contact:", error);
    }
  };


  // Handle input changes and reset errors
  const handleChange = (e: any) => {
    if (e.target.name === "phone") {
      // Allow only numbers and restrict strings
      if (!/^\d*$/.test(e.target.value)) {
        return;
      }
    }
    setContact({ ...contact, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
 


   // Form Validations of Each Required Fields
  const validateForm = () => {
    const newErrors: any = {};
    if (!contact.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!contact.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!contact.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!contact.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!contact.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required.";
    } else if (new Date(contact.dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of Birth cannot be a future date.";
    }
    return newErrors;
  };


  //Form Save 
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      if (contact.contactId === 0) {
        await createContact(contact);
        alert("Contact added successfully!");
      } else {
        await updateContact(contact.contactId, contact);
        alert("Contact updated successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };


  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        padding: "10px",
        marginTop: "-20px", 
      }}
    >
      <div
        className="card shadow-lg p-3"
        style={{
          width: "450px",
          maxHeight: "95vh",
          overflowY: "auto",
        }}
      >
        <h5 className="text-center mb-2 text-primary" style={{ fontSize: "20px" }}>
          {contact.contactId === 0 ? "Add Contact" : "Edit Contact"}
        </h5>

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-1">
            <label className="form-label mb-1">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control form-control-sm"
              value={contact.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <div className="text-danger">{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-1">
            <label className="form-label mb-1">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              className="form-control form-control-sm"
              value={contact.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <div className="text-danger">{errors.lastName}</div>
            )}
          </div>

          {/* Email */}
          <div className="mb-1">
            <label className="form-label mb-1">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control form-control-sm"
              value={contact.email}
              onChange={handleChange}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-1">
            <label className="form-label mb-1">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control form-control-sm"
              value={contact.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="text-danger">{errors.phone}</div>}
          </div>

          {/* Address */}
          <div className="mb-1">
            <label className="form-label mb-1">Address</label>
            <textarea
              name="address"
              className="form-control form-control-sm"
              rows={2}
              value={contact.address}
              onChange={handleChange}
            />
          </div>

          {/* Remarks */}
          <div className="mb-1">
            <label className="form-label mb-1">Remarks</label>
            <input
              type="text"
              name="remarks"
              className="form-control form-control-sm"
              value={contact.remarks}
              onChange={handleChange}
            />
          </div>

          {/* Date of Birth */}
          <div className="mb-2">
            <label className="form-label mb-1">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className="form-control form-control-sm"
              value={contact.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && (
              <div className="text-danger">{errors.dateOfBirth}</div>
            )}
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="d-flex justify-content-start mt-2">
            <button type="submit" className="btn btn-primary btn-sm me-2">
              {contact.contactId === 0 ? "Save" : "Update"}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ContactForm;
