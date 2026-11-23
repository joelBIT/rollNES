import type { ReactNode } from "react";
import type { Tables, TablesInsert } from "./database.types";

export type Button = {
    name: "A" | "B" | "Start" | "Select" | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" | "A2" | "B2" | "Start2" | "Select2" | "ArrowUp2" | "ArrowDown2" | "ArrowLeft2" | "ArrowRight2",
    value: string
}

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
export type CreateReview = TablesInsert<"reviews">;
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

export type GameController = {
    a: Button;
    b: Button;
    select: Button;
    start: Button;
    up: Button;
    down: Button;
    left: Button;
    right: Button;
}

export type BindingOwner = { player: 1 | 2, key: keyof GameController };

export type SortOrder = "oldest" | "newest" | "name";