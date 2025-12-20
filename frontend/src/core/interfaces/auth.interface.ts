export interface User {
    id: string;
    email: string;
    role: 'admin' | 'regular';
    username?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
    lastLogin?: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    role: 'admin' | 'regular';
    username?: string;
    confirmPassword?: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    message?: string;
}

export interface RefreshTokenResponse {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
}

export interface PasswordResetRequestDto {
    email: string;
}

export interface PasswordResetDto {
    token: string;
    password: string;
    confirmPassword?: string;
}

export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}