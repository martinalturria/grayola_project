import type { ApiResponse } from "./api-response";

export interface RegisterRequest {
    email: string;
    password: string;
    nombre?: string;
    apellido?: string; 
}

export type RegisterResponse = ApiResponse<{
    id: string;
    email: string;
    role: string | null;
    nombre?: string | null;
    apellido?: string | null; 
} | null>;

export interface LoginRequest {
    email: string;
    password: string;
}

export type LoginResponse = ApiResponse<{
    id: string;
    email: string | undefined;
    role: string | null;
    token: string | null;
} | null>;

export interface SupabaseUser {
    id: string;
    email: string;
    user_metadata?: {
        [key: string]: any; 
        nombre?: string; 
        apellido?: string;
    };
}
