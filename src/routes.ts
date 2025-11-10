import { createBrowserRouter } from "react-router";
import { URL_HOME, URL_NOT_FOUND_PAGE } from "./utils";
import { App } from "./components";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";

export const routes = createBrowserRouter([
    {
        path: URL_HOME,
        Component: App,
        children: [
            {
                index: true,
                Component: LandingPage
            },
            {
                path: URL_NOT_FOUND_PAGE,
                Component: NotFoundPage
            }
        ]
    },
]);