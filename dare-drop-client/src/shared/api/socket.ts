import { useUserStore } from "@/entities/user";
import { __API_URL__ } from "@/shared/consts/api";
import { io } from "socket.io-client";

export const socket = io(__API_URL__, {
  query: {
    Authorization: "Bearer " + useUserStore.getState().accessToken,
  },
});
