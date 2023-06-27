import { REFRESH_TOKEN_LOCALSTORAGE_KEY } from "@/shared/consts/local-storage";
import { createSelectors } from "@/shared/lib/store";
import { create } from "zustand";

type UserState = {
  accessToken?: string;
  isAuth: boolean;
  _inited: boolean;
};

interface SetAuthDataArgs {
  accessToken: string;
}

const useUserStoreBase = create<UserState>(() => ({
  id: undefined,
  accessToken: undefined,
  isAuth: false,
  _inited: false,
}));

export const useUserStore = createSelectors(useUserStoreBase);

export const setAuthData = ({ accessToken }: SetAuthDataArgs) =>
  useUserStoreBase.setState({ accessToken, isAuth: true });

export const initUser = () => useUserStoreBase.setState({ _inited: true });

export const logout = () => {
  localStorage.removeItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);
  useUserStoreBase.setState({ accessToken: undefined, isAuth: false });
};
