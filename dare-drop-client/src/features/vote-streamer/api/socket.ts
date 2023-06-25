import { __API_URL__ } from "@/shared/consts/api";
import { io } from "socket.io-client";

export const socket = io(__API_URL__);
