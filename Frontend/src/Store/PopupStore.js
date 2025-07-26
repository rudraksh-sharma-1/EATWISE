// store/popupStore.ts
import { create } from 'zustand';

const usePopupStore = create((set) => ({
  showLoginPopup: false, // state to control the popup visibility
  showLogin: () => set({ showLoginPopup: true }), // function to show the popup
  closeLoginPopup: () => set({ showLoginPopup: false }), // function to hide the popup
}));

export default usePopupStore;
