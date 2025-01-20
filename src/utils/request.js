// utils/request.js
import axios from "axios";

// Create a centralized instance of axios
const axiosInstance = axios.create({
  baseURL: "https://backend-nwcq.onrender.com/api/", // Replace with your base API URL
  headers: {
    "Content-Type": "application/json",
    // Add any default headers here (e.g., Authorization)
  },
});

// Common function to handle HTTP requests
export const request = async (method, url, data = null) => {
  try {
    const response = await axiosInstance({
      method: method, // HTTP method (GET, POST, PUT, DELETE)
      url: url, // Endpoint URL
      data: data, // Data for PUT/POST requests
    });

    return response.data; // Return the response data
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error; // Re-throw the error for handling elsewhere
  }
};

// Helper functions for specific HTTP methods
export const get = (url) => request("GET", url);
export const post = (url, data) => request("POST", url, data);
export const put = (url, data) => request("PUT", url, data);
export const del = (url) => request("DELETE", url);
