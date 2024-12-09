import { supabase } from "@/lib/api/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/api/middlewares/api-response";
import type { NextResponse } from "next/server";
import { validateEmailAndPassword } from "@/utils/api/data_validation";
import { AdminLoginRequest, AdminLoginResponse } from "@/types/api/admin";

/**
 * POST /api/admin/login
 *
 * Endpoint to authenticate an admin user using email and password.
 * Only accessible to users with the `superuser` role.
 *
 * @param {Request} req - HTTP request containing `email` and `password` in the body.
 * @returns {Promise<NextResponse<AdminLoginResponse>>} - Response with the result of the login process.
 */
export async function POST(
    req: Request
): Promise<NextResponse<AdminLoginResponse>> {
    try {
        const { email, password }: AdminLoginRequest = await req.json();

        const validationError = await validateEmailAndPassword<
            AdminLoginResponse["data"]
        >(email, password);
        if (validationError) return validationError;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.session || !data.user) {
            return errorResponse<AdminLoginResponse["data"]>(
                "Invalid email or password",
                401
            );
        }

        const { data: profile, error: profileError } = await supabase
            .from("profile")
            .select("role_project")
            .eq("id", data.user.id)
            .single();

        if (profileError || profile?.role_project !== "superuser") {
            return errorResponse<AdminLoginResponse["data"]>(
                "Access denied: you do not have admin privileges",
                403
            );
        }

        return successResponse<AdminLoginResponse["data"]>(
            {
                id: data.user.id,
                email: data.user.email || "",
                role: profile.role_project,
                token: data.session.access_token,
            },
            "Admin login successful"
        );
    } catch (err: any) {
        return errorResponse<AdminLoginResponse["data"]>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
