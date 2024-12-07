import { supabase } from "@/lib/supabase/supabase";
import { errorResponse } from "@/lib/middlewares/api-response";
import type { NextRequest, NextResponse } from "next/server";
import type { UserResponse } from "@supabase/supabase-js";

/**
 * Middleware to validate authentication token and user role.
 *
 * @param req - HTTP request object
 * @param allowedRoles - Array of allowed roles
 * @returns - Authenticated user data or error response
 */
export async function validateAuth(
    req: NextRequest,
    allowedRoles: string[] = []
): Promise<
    { id: string; email: string | null; role: string | null } | NextResponse
> {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return errorResponse("Missing or invalid authorization token", 401);
        }

        const token = authHeader.split(" ")[1];

        const { data, error }: UserResponse = await supabase.auth.getUser(
            token
        );

        if (error || !data?.user) {
            return errorResponse("Invalid or expired token", 401);
        }

        const userRole: string | null =
            data.user.user_metadata?.role_project || null;

        if (
            allowedRoles.length > 0 &&
            (!userRole || !allowedRoles.includes(userRole))
        ) {
            return errorResponse("Forbidden: Insufficient permissions", 403);
        }

        return {
            id: data.user.id,
            email: data.user.email ?? null,
            role: userRole,
        };
    } catch (err: any) {
        return errorResponse(
            err.message || "An unexpected error occurred during authentication",
            500
        );
    }
}
