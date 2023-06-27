import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export type ApiAxiosError = AxiosError<ErrorResponse>;
