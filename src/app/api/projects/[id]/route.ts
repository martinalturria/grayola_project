import { supabase } from "@/lib/api/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/api/middlewares/api-response";
import { validateAuth } from "@/lib/api/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api/api-response";
import type { GetProjectByIdResponse } from "@/types/api/projects";

/**
 * GET /api/projects/[id]
 *
 * Endpoint to retrieve a project by its ID.
 * Restricted to users with roles `project_manager`, `designer`, and `client`.
 * Designers can only view projects assigned to them.
 * Clients can only view projects they created.
 *
 * @param {NextRequest} req - HTTP request containing the project ID.
 * @returns {Promise<NextResponse<ApiResponse<GetProjectByIdResponse | null>>>} - Response with project details or error.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<GetProjectByIdResponse | null>>> {
    try {
        const authUser = await validateAuth(req, [
            "project_manager",
            "designer",
            "client",
        ]);
        if (authUser instanceof NextResponse) return authUser;

        const projectId = params.id;

        if (!projectId) {
            return errorResponse<GetProjectByIdResponse | null>(
                "Missing required parameter: project ID",
                400
            );
        }

        const query = supabase.from("projects").select("*").eq("id", projectId);

        if (authUser.role === "designer") {
            query.eq("assigned_to", authUser.id);
        } else if (authUser.role === "client") {
            query.eq("created_by", authUser.id);
        }

        const { data, error } = await query.single<GetProjectByIdResponse>();

        if (error || !data) {
            return errorResponse<GetProjectByIdResponse | null>(
                error?.message || "Project not found",
                404
            );
        }

        return successResponse<GetProjectByIdResponse | null>(
            {
                id: data.id,
                title: data.title,
                description: data.description,
                created_by: data.created_by,
                assigned_to: data.assigned_to,
                status: data.status,
                created_at: data.created_at,
            },
            "Project retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<GetProjectByIdResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
