import { supabase } from "@/lib/api/supabase/supabase";
import {
    successResponse,
    errorResponse,
} from "@/lib/api/middlewares/api-response";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import { GetDesignerUsersResponse } from "@/types/api/user";

/**
 * GET /api/users/designers
 *
 * Endpoint to retrieve all users with the role `designer`.
 * Accessible to users with roles `project_manager` or `admin`.
 * Returns the full profile data for each designer, including the user's `id`, `first_name`, `last_name`, `role_project`, and `created_at`.
 *
 * @param {NextRequest} req - HTTP request.
 * @returns {Promise<NextResponse<ApiResponse<GetDesignerUsersResponse | null>>>} - Response with designer users data or error.
 */
export async function GET(
    req: NextRequest
): Promise<NextResponse<ApiResponse<GetDesignerUsersResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["project_manager"]);
        if (authUser instanceof NextResponse) return authUser;

        const { data, error } = await supabase
            .from("profile")
            .select("id, first_name, last_name, role_project, created_at")
            .eq("role_project", "designer");

        if (error || !data) {
            return errorResponse<GetDesignerUsersResponse | null>(
                error?.message || "Failed to fetch designers",
                500
            );
        }

        return successResponse<GetDesignerUsersResponse | null>(
            data,
            "Designer users retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<GetDesignerUsersResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
