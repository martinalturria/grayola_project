import type { ApiResponse } from "./api-response";

export interface RegisterRequest {
    email: string;
    password: string;
}

export type RegisterResponse = ApiResponse<null | object>;

export interface SupabaseUser {
    id: string;
    email: string;
    user_metadata?: {
        [key: string]: any;
    };
}
