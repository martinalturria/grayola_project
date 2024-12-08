import type { ApiResponse } from "./api-response";

export interface AdminLoginRequest {
    email: string;
    password: string;
}

export type AdminLoginResponse = ApiResponse<{
    id: string;
    email: string;
    role: string | null;
    token: string | null;
} | null>;

export type User = {
    id: string;
    first_name: string | null;
    last_name: string | null;
    role_project: string;
    created_at: string;
};

export type UserListResponse = User[];

export type UserByIdResponse = User | null;

export type DeleteUserResponse = {
    id: string;
    message: string;
} | null;
