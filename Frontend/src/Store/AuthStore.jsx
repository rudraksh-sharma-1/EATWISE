import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAdmin: JSON.parse(localStorage.getItem('user'))?.type === 'admin' || false, // Determine admin based on user type

  initialize: () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    set({ token, user, isAdmin: user?.type === 'admin' }); // Initialize isAdmin state
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ user, isAdmin: user?.type === 'admin' }); // Set isAdmin based on user type
  },

  clearToken: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null, isAdmin: false });
  },

  setAdminStatus: (status) => {
    set({ isAdmin: status });
  },
  
}));

export default useAuthStore;
