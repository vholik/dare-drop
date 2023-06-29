import { createSelectors } from "@/shared/lib/store";
import { create } from "zustand";

type AuthFormState = {
  isOpen: boolean;
};

const useAuthFormStoreBase = create<AuthFormState>(() => ({
  isOpen: false,
}));

export const useAuthFormStore = createSelectors(useAuthFormStoreBase);

export const closeAuthForm = () =>
  useAuthFormStoreBase.setState({ isOpen: false });

export const openAuthForm = () =>
  useAuthFormStoreBase.setState({ isOpen: true });
