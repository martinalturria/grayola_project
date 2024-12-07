import { supabase } from "@/lib/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import type { NextResponse } from "next/server";
import { validateEmailAndPassword } from "@/utils/data_validation";

/**
 * POST /api/auth/login
 *
 * Endpoint to authenticate a user using email and password.
 *
 * @param {Request} req - HTTP request containing `email` and `password` in the body.
 * @returns {Promise<NextResponse<LoginResponse>>} - Response with the result of the login process.
 */
export async function POST(req: Request): Promise<NextResponse<LoginResponse>> {
    try {
        const { email, password }: LoginRequest = await req.json();

        const validationError = await validateEmailAndPassword<
            LoginResponse["data"]
        >(email, password);
        if (validationError) return validationError;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.session || !data.user) {
            return errorResponse<LoginResponse["data"]>(
                "Invalid email or password",
                401
            );
        }

        return successResponse<LoginResponse["data"]>(
            {
                id: data.user.id,
                email: data.user.email,
                role: data.user.user_metadata?.role_project || null,
                token: data.session.access_token,
            },
            "Login successful"
        );
    } catch (err: any) {
        return errorResponse<LoginResponse["data"]>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
