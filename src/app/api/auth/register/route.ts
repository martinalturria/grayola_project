import { supabase } from "@/lib/supabase/supabase";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import type {
    RegisterRequest,
    RegisterResponse,
    SupabaseUser,
} from "@/types/auth";
import type { NextResponse } from "next/server";
import { validateEmailAndPassword } from "@/utils/data_validation";

/**
 * POST /api/auth/register
 *
 * Endpoint to register a new user with the default role `cliente`.
 *
 * @param {Request} req - HTTP request containing `email` and `password` in the body.
 * @returns {Promise<NextResponse<RegisterResponse>>} - Response with the result of the registration.
 */
export async function POST(
    req: Request
): Promise<NextResponse<RegisterResponse>> {
    try {
        const { email, password }: RegisterRequest = await req.json();

        const validationError = await validateEmailAndPassword<
            RegisterResponse["data"]
        >(email, password);
        if (validationError) return validationError;

        const { data: existingUsers, error: fetchError } =
            await supabaseAdmin.auth.admin.listUsers();

        if (fetchError) {
            return errorResponse<RegisterResponse["data"]>(
                fetchError.message,
                500
            );
        }

        const isEmailRegistered = (existingUsers.users as SupabaseUser[]).some(
            (user) => user.email === email
        );

        if (isEmailRegistered) {
            return errorResponse<RegisterResponse["data"]>(
                "Email is already registered",
                400
            );
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role_project: "cliente",
                },
            },
        });

        if (error) {
            return errorResponse<RegisterResponse["data"]>(error.message, 500);
        }

        return successResponse<RegisterResponse["data"]>(
            {
                id: data.user?.id || "",
                email: data.user?.email || "",
                role: data.user?.user_metadata?.role_project || null,
            },
            "User registered successfully"
        );
    } catch (err: any) {
        return errorResponse<RegisterResponse["data"]>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
