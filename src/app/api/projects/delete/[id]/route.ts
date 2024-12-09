import { supabase } from "@/lib/api/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/api/middlewares/api-response";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import type { DeleteProjectResponse } from "@/types/api/projects";

/**
 * DELETE /api/projects/delete/[id]
 *
 * Endpoint to delete a project. Restricted to users with the role `project_manager`.
 *
 * @param {NextRequest} req - HTTP request.
 * @returns {Promise<NextResponse<ApiResponse<DeleteProjectResponse | null>>>} - Response with project deletion status or error.
 */
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<DeleteProjectResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["project_manager"]);
        if (authUser instanceof NextResponse) return authUser;

        const projectId = req.nextUrl.pathname.split("/").pop();

        if (!projectId) {
            return errorResponse<DeleteProjectResponse | null>(
                "Project ID is required",
                400
            );
        }

        const { data, error } = await supabase
            .from("projects")
            .delete()
            .eq("id", projectId)
            .select()
            .single();

        if (error || !data) {
            return errorResponse<DeleteProjectResponse | null>(
                error?.message || "Failed to delete project",
                500
            );
        }

        return successResponse<DeleteProjectResponse | null>(
            {
                id: data.id,
                message: `Project with ID ${data.id} deleted successfully.`,
            },
            "Project deleted successfully"
        );
    } catch (err: any) {
        return errorResponse<DeleteProjectResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
