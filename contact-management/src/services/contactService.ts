import axios from "axios";
import { ContactModel } from "../models/ContactModel";

// Define the base URL for your API
const API_URL = "https://localhost:7043/api/contacts";


// Get all contacts
export const getContactsList = async (): Promise<ContactModel[]> => {
  try {
    const response = await axios.get<ContactModel[]>(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get contact by ID
export const getContactDetails = async (id: number): Promise<ContactModel> => {
  try {
    const response = await axios.get<ContactModel>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new contact
export const createContact = async (
  contact: ContactModel
): Promise<ContactModel> => {
  try {
    const response = await axios.post<ContactModel>(API_URL, contact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing contact
export const updateContact = async (
  id: number,
  contact: ContactModel
): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${id}`, contact);
  } catch (error) {
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};
