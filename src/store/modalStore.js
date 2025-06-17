import { create } from 'zustand';

const useModalStore = create((set) => ({
    isLoginOpen: false,
    openLogin: () => set({ isLoginOpen: true }),
    closeLogin: () => set({ isLoginOpen: false }),
}));

export default useModalStore;
