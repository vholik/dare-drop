import { useQuery } from "@tanstack/react-query";
import { initUser, setAuthData } from "../store/user-store";
import { REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@/shared/consts/local-storage";
import { __API_URL__ } from "@/shared/consts/api";
import { fetchRefreshToken } from "@/shared/api/api";

export function useInitUser() {
  const query = useQuery({
    queryKey: ["init-user"],
    queryFn: fetchRefreshToken,
    onSuccess: ({ accessToken, refreshToken }) => {
      setAuthData({ accessToken: accessToken });
      localStorage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refreshToken);
      initUser();
    },
    onError: () => {
      initUser();
    },
  });

  return query;
}
