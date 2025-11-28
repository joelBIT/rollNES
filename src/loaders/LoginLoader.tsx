import { redirect } from "react-router";
import { supabase } from "../components";

/**
 * Redirect to dashboard if user is already logged in.
 */
export const LoginLoader = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession();
    if (data && data.session?.user && data.session?.user.aud === "authenticated") {
        throw redirect("/dashboard");
    }
};