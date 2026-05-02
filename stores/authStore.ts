import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { User, AuthError} from "@supabase/supabase-js";

interface AuthState {
    user: User | null;
    age: Number | null;
    loading: boolean;
    // signIn: (email: string, password: string) => Promise<void>;
    // signOut: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    setUser: (user: User | null) => void;
    setAge: (age: Number | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    age: null,
    loading: false,
    setUser: (passedUser) => set({user: passedUser}),
    setAge: (passedAge) => set({age: passedAge}),
    signUp: async (passedEmail:string, passedPassword: string) => {
        try{
            set({loading: true});
            const {data, error} = await supabase.auth.signUp({email: passedEmail, password: passedPassword});
            
            if(error)
            {
                throw error;
            }

            console.log("sign up data: ", data);

            set({user: data.user, loading: false});


        }catch(err){
            console.error("ERR: ", err);
            set({user: null, loading: false});
        }
    }

}))