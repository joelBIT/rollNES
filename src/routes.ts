import { createBrowserRouter } from "react-router";
import { URL_GAME_PAGE, URL_GAMES_PAGE, URL_HOME, URL_LOGIN_PAGE, URL_NOT_FOUND_PAGE, URL_REGISTER_PAGE, URL_TEAM_PAGE } from "./utils";
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
import TeamPage from "./pages/about/TeamPage";

export const routes = createBrowserRouter([
    {
        path: URL_HOME,
        Component: App,
        children: [
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
                path: URL_LOGIN_PAGE,
                Component: LoginPage
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
        ]
    },
]);