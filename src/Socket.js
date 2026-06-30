import { io } from "socket.io-client";

const socket = io("https://job-portal-bac.onrender.com");

export default socket;