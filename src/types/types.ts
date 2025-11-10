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
    description: string,
    rom: boolean
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