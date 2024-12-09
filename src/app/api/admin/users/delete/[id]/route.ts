import { supabaseAdmin } from "@/lib/api/supabase/supabase-admin";
import { supabase } from "@/lib/api/supabase/supabase";
import {
    successResponse,
    errorResponse,
} from "@/lib/api/middlewares/api-response";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import { DeleteUserResponse } from "@/types/api/admin";

/**
 * DELETE /api/admin/delete/[id]
 *
 * Endpoint to delete a user. Restricted to users with the `superuser` role.
 *
 * @param {NextRequest} req - HTTP request.
 * @returns {Promise<NextResponse<ApiResponse<DeleteUserResponse | null>>>} - Response with deletion status or error.
 */
export async function DELETE(
    req: NextRequest
): Promise<NextResponse<ApiResponse<DeleteUserResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["superuser"]);
        if (authUser instanceof NextResponse) return authUser;

        const userId = req.nextUrl.pathname.split("/").pop();

        if (!userId) {
            return errorResponse<DeleteUserResponse | null>(
                "User ID is required",
                400
            );
        }

        const { error: profileError } = await supabase
            .from("profile")
            .delete()
            .eq("id", userId);

        if (profileError) {
            return errorResponse<DeleteUserResponse | null>(
                profileError.message || "Failed to delete from profile",
                500
            );
        }

        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
            userId
        );

        if (authError) {
            return errorResponse<DeleteUserResponse | null>(
                authError.message || "Failed to delete from auth",
                500
            );
        }

        return successResponse<DeleteUserResponse | null>(
            {
                id: userId,
                message: `User with ID ${userId} deleted successfully.`,
            },
            "User deleted successfully"
        );
    } catch (err: any) {
        return errorResponse<DeleteUserResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
