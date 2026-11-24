import type { ReactNode } from "react";
import type { Tables, TablesInsert } from "./database.types";

export type AuthenticationRequest = {
    email: string,
    password: string
}

export type AuthenticationResponse = {
    access_token: string,
    refresh_token: string
}

export type RegisterRequest = AuthenticationRequest &  { firstName: string, lastName: string }

export type RegistrationResult = {
    user: RetroUser,
    hasSession: boolean        // false when email confirmation is required before the user can sign in
}

// Only the columns the app selects, kept in sync with the select strings in requests.ts
export type Review = Pick<Tables<"reviews">, "id" | "game_id" | "reviewer_name" | "date" | "heading" | "rating" | "review" | "reviewer_id">;
export type CreateReview = Pick<TablesInsert<"reviews">, "game_id" | "heading" | "rating" | "review" | "reviewer_name">;
export type Game = Pick<Tables<"games">, "id" | "title" | "publisher" | "developer" | "category" | "players" | "cover" | "release_date" | "description"> & {
    reviews: Review[]
};

export type RetroUser = {       // User of this application
    id: string,
    email: string,
    last_name: string,
    first_name: string
}

export type FooterLink = {
    title: string,
    link: string
}

export type FrequentlyAskedQuestion = {
    question: string,
    answer: ReactNode
}

export type Filter = "category" | "players" | "publisher" | "developer" | "title";

export type AppliedFilter = {
    type: Filter,
    value: string
}

export type ButtonId = "a" | "b" | "select" | "start" | "up" | "down" | "left" | "right";
export type PlayerNumber = 1 | 2;

// The key code bound to each button of one player, e.g. { a: "KeyZ", up: "ArrowUp", ... }
export type GameController = Record<ButtonId, string>;

// The format the emulator worker expects for its configuration.
export type Button = {
    name: string,
    value: string
}

export type BindingOwner = { player: 1 | 2, button: keyof GameController };

export type Controllers = Record<PlayerNumber, GameController>;

export type SortOrder = "oldest" | "newest" | "name";

export type LoadStatus = "loading" | "ready" | "error";