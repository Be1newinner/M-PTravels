import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface User {
  _id: string;
  name: string;
  email: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  refreshAccessToken: (acessToken: string) => void;
  updateUser: (partialUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        login: (user) =>
          set({ user, isAuthenticated: true }, false, "auth/login"),
        logout: () =>
          set({ user: null, isAuthenticated: false }, false, "auth/logout"),
        refreshAccessToken: (newAccessToken) => {
          set(
            (state) => {
              if (state.user)
                return {
                  user: {
                    ...state.user,
                    accessToken: newAccessToken,
                  },
                };

              return state;
            },
            false,
            "auth/refreshAccessToken"
          );
        },

        updateUser: (partialUser) => {
          set(
            (state) => {
              if (state.user) {
                return {
                  user: {
                    ...state.user,
                    ...partialUser,
                  },
                };
              }
              return state;
            },
            false,
            "auth/updateUser"
          );
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => {
          if (!state.user) {
            return { user: null };
          }
          const { accessToken, ...userWithoutToken } = state.user;
          return {
            user: userWithoutToken,
            isAuthenticated: state.isAuthenticated,
          };
        },
      }
    ),
    {
      name: "AuthStore",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);
