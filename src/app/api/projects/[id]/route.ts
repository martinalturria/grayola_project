import { supabase } from "@/lib/api/supabase/supabase";
import {
    successResponse,
    errorResponse,
} from "@/lib/api/middlewares/api-response";
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

        const projectId = req.nextUrl.pathname.split("/").pop();

        if (!projectId) {
            return errorResponse<GetProjectByIdResponse | null>(
                "Missing required parameter: project ID",
                400
            );
        }

        const query = supabase
            .from("projects")
            .select(
                `
            *,
            assigned_to_profile:profile!projects_assigned_to_fkey(
                id,
                first_name,
                last_name
            ),
            created_by_profile:profile!projects_created_by_fkey(
                id,
                first_name,
                last_name
            )
        `
            )
            .eq("id", projectId);

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

        const formattedData = {
            id: data.id,
            title: data.title,
            description: data.description,
            created_by: data.created_by,
            assigned_to: data.assigned_to,
            status: data.status,
            created_at: data.created_at,
            assigned_to_name: data.assigned_to_profile
                ? `${data.assigned_to_profile.first_name || ""} ${
                      data.assigned_to_profile.last_name || ""
                  }`.trim()
                : null,
            created_by_name: data.created_by_profile
                ? `${data.created_by_profile.first_name || ""} ${
                      data.created_by_profile.last_name || ""
                  }`.trim()
                : null,
        };

        return successResponse<GetProjectByIdResponse | null>(
            formattedData,
            "Project retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<GetProjectByIdResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
