import { supabaseAdmin } from "@/lib/api/supabase/supabase-admin";
import { errorResponse } from "@/lib/api/middlewares/api-response";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";

/**
 * Middleware to validate authentication token and user role.
 *
 * @param req - HTTP request object
 * @param allowedRoles - Array of allowed roles
 * @returns - Authenticated user data or error response.
 */
export async function validateAuth(
    req: NextRequest,
    allowedRoles: string[] = []
): Promise<
    | { id: string; email: string | null; role: string | null }
    | NextResponse<ApiResponse<null>>
> {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return errorResponse<null>(
                "Missing or invalid authorization token",
                401
            );
        }

        const token = authHeader.split(" ")[1];

        const { data: authData, error: authError } =
            await supabaseAdmin.auth.getUser(token);

        if (authError || !authData?.user) {
            return errorResponse<null>("Invalid or expired token", 401);
        }

        const userId = authData.user.id;

        const { data: profileData, error: profileError } = await supabaseAdmin
            .from("profile")
            .select("role_project")
            .eq("id", userId)
            .single();

        if (profileError || !profileData) {
            return errorResponse<null>(
                "User profile not found or insufficient permissions",
                403
            );
        }

        const userRole = profileData.role_project;

        if (
            allowedRoles.length > 0 &&
            (!userRole || !allowedRoles.includes(userRole))
        ) {
            return errorResponse<null>(
                "Forbidden: Insufficient permissions",
                403
            );
        }

        return {
            id: userId,
            email: authData.user.email || null,
            role: userRole,
        };
    } catch (err: any) {
        return errorResponse<null>(
            err.message || "An unexpected error occurred during authentication",
            500
        );
    }
}
