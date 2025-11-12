import { createBrowserRouter } from "react-router";
import { URL_COMPANY_PAGE, URL_CONTACT_PAGE, URL_GAME_PAGE, URL_GAMES_PAGE, URL_HELP_CENTER_PAGE, URL_HOME, URL_LOGIN_PAGE, URL_NOT_FOUND_PAGE, URL_REGISTER_PAGE, URL_RIGHTS_PAGE, URL_TEAM_PAGE, URL_TERMS_PAGE, URL_VISION_PAGE } from "./utils";
import { App } from "./components";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import GamePage from "./pages/games/GamePage";
import { GameLoader } from "./loaders/GameLoader";
import GamesPage from "./pages/games/GamesPage";
import { GamesLoader } from "./loaders/GamesLoader";
import { LandingLoader } from "./loaders/LandingLoader";
import CompanyPage from "./pages/about/CompanyPage";
import TeamPage from "./pages/about/TeamPage";
import VisionPage from "./pages/about/VisionPage";
import ContactPage from "./pages/about/ContactPage";
import HelpCenterPage from "./pages/resources/HelpCenterPage";
import ManageRightsPage from "./pages/resources/ManageRightsPage";
import TermsPage from "./pages/resources/TermsPage";

export const routes = createBrowserRouter([
    {
        path: URL_HOME,
        Component: App,
        children: [
            {
                path: URL_COMPANY_PAGE,
                Component: CompanyPage
            },
            {
                path: URL_CONTACT_PAGE,
                Component: ContactPage
            },
            {
                index: true,
                Component: LandingPage,
                loader: LandingLoader
            },
            {
                path: URL_GAME_PAGE + "/:id",
                Component: GamePage,
                loader: GameLoader
            },
            {
                path: URL_GAMES_PAGE,
                Component: GamesPage,
                loader: GamesLoader
            },
            {
                path: URL_HELP_CENTER_PAGE,
                Component: HelpCenterPage
            },
            {
                path: URL_LOGIN_PAGE,
                Component: LoginPage
            },
            {
                path: URL_RIGHTS_PAGE,
                Component: ManageRightsPage
            },
            {
                path: URL_NOT_FOUND_PAGE,
                Component: NotFoundPage
            },
            {
                path: URL_REGISTER_PAGE,
                Component: RegisterPage
            },
            {
                path: URL_TEAM_PAGE,
                Component: TeamPage
            },
            {
                path: URL_TERMS_PAGE,
                Component: TermsPage
            },
            {
                path: URL_VISION_PAGE,
                Component: VisionPage
            },
        ]
    },
]);