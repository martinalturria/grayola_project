import { supabase } from "@/lib/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import { validateAuth } from "@/lib/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api-response";
import type {
    UpdateProjectRequest,
    UpdateProjectResponse,
} from "@/types/projects";

/**
 * PUT /api/projects/[id]
 *
 * Endpoint to update a project. Restricted to users with the role `project_manager`.
 *
 * @param {NextRequest} req - HTTP request containing the project updates in the body.
 * @returns {Promise<NextResponse<ApiResponse<UpdateProjectResponse | null>>>} - Response with updated project details or error.
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<UpdateProjectResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["project_manager"]);
        if (authUser instanceof NextResponse) return authUser;

        const projectId = params.id;

        if (!projectId) {
            return errorResponse<UpdateProjectResponse | null>(
                "Missing required parameter: project ID",
                400
            );
        }

        const updates: UpdateProjectRequest = await req.json();

        const { title, description, assigned_to, status } = updates;

        if (!title && !description && !assigned_to && !status) {
            return errorResponse<UpdateProjectResponse | null>(
                "No fields provided for update",
                400
            );
        }

        const { data, error } = await supabase
            .from("projects")
            .update({
                title: title || undefined,
                description: description !== undefined ? description : null,
                assigned_to: assigned_to || null,
                status: status || undefined,
            })
            .eq("id", projectId)
            .select()
            .single();

        if (error || !data) {
            return errorResponse<UpdateProjectResponse | null>(
                error?.message || "Failed to update project",
                500
            );
        }

        return successResponse<UpdateProjectResponse | null>(
            {
                id: data.id,
                title: data.title,
                description: data.description,
                created_by: data.created_by,
                assigned_to: data.assigned_to,
                status: data.status,
                created_at: data.created_at,
                updated_at: data.updated_at,
            },
            "Project updated successfully"
        );
    } catch (err: any) {
        return errorResponse<UpdateProjectResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
