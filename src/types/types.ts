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