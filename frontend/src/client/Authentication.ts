const SERVER_URL = "http://localhost:3000";

export type LoginData = {
    username: string;
    password: string;
};

export type RegisterData = {
    username: string;
    password: string;
};

export function login(data: LoginData) {
    return fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function register(data: RegisterData) {
    return fetch(`${SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

export function verify() {
    return fetch("/auth/verify");
}