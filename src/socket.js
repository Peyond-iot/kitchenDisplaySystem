// src/socket.js
import { io } from "socket.io-client";

// Initialize the socket connection
const socket = io("https://backend-nwcq.onrender.com"); // Replace with your actual backend URL

// Export the socket instance
export default socket;
