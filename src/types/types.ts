import type { ReactNode } from "react";

export type Button = {
    button: string,
    value: string
}

export type Game = {
    id: number,
    title: string,
    publisher: string,
    developer: string,
    category: string,
    release_date: string,
    reviews: Review[],
    cover: string,
    players: number,
    description: string
}

export type AuthenticationRequest = {
    email: string,
    password: string
}

export type RegisterRequest = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export type Review = {
    reviewer_name: string,
    game_id: number,
    date: string,
    heading: string,
    rating: number,
    review: string
}

export type CreateReview = {
    reviewer_id: number,
    game_id: number,
    heading: string,
    rating: number,
    review: string
}

export type FooterLink = {
    title: string,
    link: string
}

export type FrequentlyAskedQuestion = {
    question: string,
    answer: ReactNode
}

export type Filter = "category" | "players" | "publisher" | "developer";

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