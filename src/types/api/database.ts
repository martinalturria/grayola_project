export interface SupabaseAuthResponse {
    data: {
        user: SupabaseDatabaseUser | null;
    } | null;
    error: {
        message: string;
        status: number;
    } | null;
}

export interface SupabaseDatabaseUser {
    id: string;
    email: string; 
    user_metadata?: {
        [key: string]: any;
    };
}

export interface SupabaseUserMetadata {
    role_project?: string;
    [key: string]: any;
}
