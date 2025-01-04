// src/socket.js
import { io } from "socket.io-client";

// Initialize the socket connection
const socket = io("http://localhost:5000"); // Replace with your actual backend URL

// Export the socket instance
export default socket;
