import { supabase } from "@/lib/api/supabase/supabase";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import {
    successResponse,
    errorResponse,
} from "@/lib/api/middlewares/api-response";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";

/**
 * PATCH /api/admin/users/role/[id]
 *
 * Endpoint to update a user's role. Restricted to users with the role `superuser`.
 *
 * @param {NextRequest} req - HTTP request containing the new role in the body.
 * @returns {Promise<NextResponse<ApiResponse<null>>>} - Response with update status or error.
 */
export async function PATCH(
    req: NextRequest
): Promise<NextResponse<ApiResponse<null>>> {
    try {
        const authUser = await validateAuth(req, ["superuser"]);
        if (authUser instanceof NextResponse) return authUser;

        const userId = req.nextUrl.pathname.split("/").pop();

        if (!userId) {
            return errorResponse<null>(
                "Missing required parameter: user ID",
                400
            );
        }

        const { newRole }: { newRole: string } = await req.json();

        const validRoles = [
            "client",
            "designer",
            "project_manager",
            "superuser",
        ];

        if (!validRoles.includes(newRole)) {
            return errorResponse<null>(
                `Invalid role. Valid roles are: ${validRoles.join(", ")}`,
                400
            );
        }

        const { data, error } = await supabase
            .from("profile")
            .update({ role_project: newRole })
            .eq("id", userId)
            .select("id, role_project")
            .single();

        if (error || !data) {
            return errorResponse<null>(
                error?.message || "Failed to update user role",
                500
            );
        }

        return successResponse<null>(
            null,
            `User role updated successfully to ${newRole}`
        );
    } catch (err: any) {
        return errorResponse<null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
