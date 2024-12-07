export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json }
    | Json[];

export interface Database {
    public: {
        Tables: {
            projects: {
                Row: {
                    id: string;
                    title: string;
                    description: string | null;
                    created_by: string;
                    assigned_to: string | null;
                    status: string;
                    created_at: string;
                };
                Insert: {
                    title: string;
                    description?: string | null;
                    created_by: string;
                    assigned_to?: string | null;
                    status?: string;
                    created_at?: string;
                };
                Update: {
                    title?: string;
                    description?: string | null;
                    created_by?: string;
                    assigned_to?: string | null;
                    status?: string;
                    created_at?: string;
                };
            };
        };
    };
}
