import { supabase } from "@/lib/api/supabase/supabase";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import { successResponse, errorResponse } from "@/lib/api/middlewares/api-response";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import type { UserListResponse } from "@/types/api/admin";

/**
 * GET /api/admin/users
 *
 * Endpoint to retrieve all users. Restricted to users with the role `superuser`.
 *
 * @param {NextRequest} req - HTTP request.
 * @returns {Promise<NextResponse<ApiResponse<UserListResponse | null>>>} - Response with a list of users or error.
 */
export async function GET(
    req: NextRequest
): Promise<NextResponse<ApiResponse<UserListResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["superuser"]);
        if (authUser instanceof NextResponse) return authUser;

        const { data, error } = await supabase.from("profile").select(`
                id,
                first_name,
                last_name,
                role_project,
                created_at
            `);

        if (error || !data) {
            return errorResponse<UserListResponse | null>(
                error?.message || "Failed to fetch users",
                500
            );
        }

        return successResponse<UserListResponse | null>(
            data,
            "Users retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<UserListResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
