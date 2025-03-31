import React, { useEffect, useState } from "react";
import { getContactsList, deleteContact } from "../services/contactService";
import { ContactModel } from "../models/ContactModel";
import { useNavigate } from "react-router-dom";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<ContactModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10; // Records per page
  const navigate = useNavigate();

  useEffect(() => {
    loadAllContacts();
  }, []);

  // Load all contacts and set to state
  const loadAllContacts = async () => {
    try {
      const data = await getContactsList();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Handle delete the contacts
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await deleteContact(id);
        alert("Contact deleted successfully.");
        loadAllContacts(); // Reload after delete
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  // Handle Add/Edit
  const handleEdit = (id?: number) => {
    if (id) {
      navigate(`/contactform/${id}`);
    } else {
      navigate("/contactform");
    }
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic based on filtered results // 1 page containing 10 Contacts
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Total pages for filtered results
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  return (
    <div className="container mt-3">
      <h4 className="mb-3">Contact List</h4>

      {/* Search Button */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <button className="btn btn-primary" onClick={() => handleEdit()}>
          Add Contact
        </button>
        <input
          type="text"
          className="form-control"
          style={{ width: "400px" }}
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Contact Table */}
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact, index) => (
            <tr key={contact.contactId}>
              <td>{indexOfFirstContact + index + 1}</td>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td style={{ width: "120px", whiteSpace: "nowrap" }}>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(contact.contactId)}
                >
                  View
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(contact.contactId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {currentContacts.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination and Count */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        {/* Total Count Display */}
        <div className="text-muted">
          Total Contacts: <strong>{filteredContacts.length}</strong>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
                } me-1`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
