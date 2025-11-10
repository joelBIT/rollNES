import { createBrowserRouter } from "react-router";
import { URL_HOME } from "./utils";
import LandingPage from "./pages/LandingPage";
import { App } from "./components/App";

export const routes = createBrowserRouter([
    {
        path: URL_HOME,
        Component: App,
        children: [
            {
                index: true,
                Component: LandingPage
            }
        ],
    },
]);