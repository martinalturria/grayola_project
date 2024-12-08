import { supabase } from "@/lib/api/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/api/middlewares/api-response";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import type {
    AssignProjectRequest,
    AssignProjectResponse,
} from "@/types/api/projects";

/**
 * PATCH /api/projects/assign/[id]
 *
 * Endpoint to assign a project to a designer. Restricted to users with the `project_manager` role.
 *
 * @param {NextRequest} req - HTTP request containing the designer ID in the body.
 * @returns {Promise<NextResponse<ApiResponse<AssignProjectResponse | null>>>} - Response with the updated project details.
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<AssignProjectResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["project_manager"]);
        if (authUser instanceof NextResponse) return authUser;

        const projectId = params.id;

        if (!projectId) {
            return errorResponse<AssignProjectResponse | null>(
                "Missing required parameter: project ID",
                400
            );
        }

        const { assigned_to }: AssignProjectRequest = await req.json();

        if (!assigned_to) {
            return errorResponse<AssignProjectResponse | null>(
                "Missing required field: assigned_to",
                400
            );
        }

        const { data: designer, error: designerError } = await supabase
            .from("profile")
            .select("id, first_name, last_name, role_project")
            .eq("id", assigned_to)
            .eq("role_project", "designer")
            .single();

        if (designerError || !designer) {
            return errorResponse<AssignProjectResponse | null>(
                "Assigned user is not a valid designer",
                400
            );
        }

        const { data: project, error: projectError } = await supabase
            .from("projects")
            .select("id")
            .eq("id", projectId)
            .single();

        if (projectError || !project) {
            return errorResponse<AssignProjectResponse | null>(
                "Project not found",
                404
            );
        }

        const { data, error } = await supabase
            .from("projects")
            .update({ assigned_to })
            .eq("id", projectId)
            .select("id, assigned_to")
            .single();

        if (error || !data) {
            return errorResponse<AssignProjectResponse | null>(
                error?.message || "Failed to assign project",
                500
            );
        }

        return successResponse<AssignProjectResponse | null>(
            {
                id: data.id,
                assigned_to: data.assigned_to,
                assigned_to_name: `${designer.first_name} ${designer.last_name}`,
            },
            "Project assigned successfully"
        );
    } catch (err: any) {
        return errorResponse<AssignProjectResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
