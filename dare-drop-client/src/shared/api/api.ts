import axios from "axios";
import { __API_URL__ } from "../consts/api";

export const $api = axios.create({
  baseURL: __API_URL__,
});
