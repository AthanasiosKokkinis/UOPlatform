import { create } from "zustand";
import { supabase, fetchProfile, Profile } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
  initialize: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: false,
  initialized: false,

  setUser: (passedUser) => set({ user: passedUser }),

  initialize: async () => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user ?? null;
    let profile: Profile | null = null;
    if (user) {
      try {
        profile = await fetchProfile(user.id);
      } catch (e) {
        console.warn("fetchProfile failed", e);
      }
    }
    set({ user, profile, initialized: true });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      let p: Profile | null = null;
      if (u) {
        try {
          p = await fetchProfile(u.id);
        } catch (e) {
          console.warn("fetchProfile failed", e);
        }
      }
      set({ user: u, profile: p });
    });
  },

  refreshProfile: async () => {
    const u = get().user;
    if (!u) return;
    try {
      const p = await fetchProfile(u.id);
      set({ profile: p });
    } catch (e) {
      console.warn("refreshProfile failed", e);
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      const profile = data.user ? await fetchProfile(data.user.id) : null;
      set({ user: data.user, profile, loading: false });
    } catch (err) {
      console.error("signIn ERR:", err);
      set({ loading: false });
      throw err;
    }
  },

  signUp: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const profile = data.user ? await fetchProfile(data.user.id) : null;
      set({ user: data.user, profile, loading: false });
    } catch (err) {
      console.error("signUp ERR:", err);
      set({ user: null, loading: false });
      throw err;
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
}));
