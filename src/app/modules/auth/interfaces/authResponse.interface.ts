export interface AuthResponse {
    token:      string;
    expiracion: Date;
}

export interface User {
    email: string,
    password: string
}
