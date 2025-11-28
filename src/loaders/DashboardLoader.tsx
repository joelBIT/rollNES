import { redirect } from "react-router";
import { supabase } from "../components";
import { URL_LOGIN_PAGE } from "../utils";

/**
 * Redirect to login if user is not authenticated.
 */
export const DashboardLoader = async (): Promise<void> => {
    const { data } = await supabase.auth.getSession();
    if (!(data && data.session?.user && data.session?.user.aud === "authenticated")) {
        throw redirect(URL_LOGIN_PAGE);
    }
};