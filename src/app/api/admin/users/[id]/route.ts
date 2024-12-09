import { supabase } from "@/lib/api/supabase/supabase";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import {
    successResponse,
    errorResponse,
} from "@/lib/api/middlewares/api-response";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import type { UserByIdResponse } from "@/types/api/admin";

/**
 * GET /api/admin/users/[id]
 *
 * Endpoint to retrieve a user by ID. Restricted to users with the role `superuser`.
 *
 * @param {NextRequest} req - HTTP request containing the user ID as a parameter.
 * @returns {Promise<NextResponse<ApiResponse<UserByIdResponse | null>>>} - Response with user details or error.
 */
export async function GET(
    req: NextRequest
): Promise<NextResponse<ApiResponse<UserByIdResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["superuser"]);
        if (authUser instanceof NextResponse) return authUser;

        const userId = req.nextUrl.pathname.split("/").pop();

        if (!userId) {
            return errorResponse<UserByIdResponse | null>(
                "Missing required parameter: user ID",
                400
            );
        }

        const { data, error } = await supabase
            .from("profile")
            .select(
                `
                id,
                first_name,
                last_name,
                role_project,
                created_at
            `
            )
            .eq("id", userId)
            .single();

        if (error || !data) {
            return errorResponse<UserByIdResponse | null>(
                error?.message || "User not found",
                404
            );
        }

        return successResponse<UserByIdResponse | null>(
            data,
            "User retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<UserByIdResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
