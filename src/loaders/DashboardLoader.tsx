import { redirect } from "react-router";
import { supabase } from "../components";
import { URL_LOGIN_PAGE } from "../utils";
import type { RetroUser } from "../types/types";

/**
 * Redirect to login if user is not authenticated.
 */
export const DashboardLoader = async (): Promise<RetroUser> => {
    const { data } = await supabase.auth.getSession();
    if (!(data && data.session?.user && data.session?.user.aud === "authenticated")) {
        throw redirect(URL_LOGIN_PAGE);
    }

    const metadata = data.session.user?.user_metadata;
    const user: RetroUser = {
        email: metadata.email,
        first_name: metadata.first_name,
        last_name: metadata.last_name
    }

    return user;
};