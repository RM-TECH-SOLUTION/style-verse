import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useSessionStore = create(
  persist(
    (set) => ({

      /* ================= STATE ================= */

      user: null,
      isLoggedIn: false,
      profileData:null,

      /* ================= ACTIONS ================= */

      // Store full user object
      setUser: (user) =>
        set({
          user,
          isLoggedIn: !!user,
        }),

         setProfile: (profileData) =>
        set({
          profileData,
          isLoggedIn: !!profileData,
        }),

      // Update partial user fields
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),

      // Clear session
      clearSession: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),

    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSessionStore;
