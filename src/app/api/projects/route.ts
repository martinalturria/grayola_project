import { supabase } from "@/lib/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import { validateAuth } from "@/lib/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api-response";
import type { GetProjectsResponse } from "@/types/projects";

/**
 * GET /api/projects
 *
 * Endpoint to retrieve projects. Accessible to users with roles `project_manager`, `designer`, or `client`.
 * - `project_manager` sees all projects.
 * - `designer` sees only projects assigned to them.
 * - `client` sees only projects created by them.
 * Includes designer's full name (if assigned).
 *
 * @param {NextRequest} req - HTTP request.
 * @returns {Promise<NextResponse<ApiResponse<GetProjectsResponse | null>>>} - Response with project data or error.
 */
export async function GET(
    req: NextRequest
): Promise<NextResponse<ApiResponse<GetProjectsResponse | null>>> {
    try {
        const authUser = await validateAuth(req, [
            "project_manager",
            "designer",
            "client",
        ]);
        if (authUser instanceof NextResponse) return authUser;

        let query = supabase.from("projects").select(`
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
        `);

        if (authUser.role === "designer") {
            query = query.eq("assigned_to", authUser.id);
        } else if (authUser.role === "client") {
            query = query.eq("created_by", authUser.id);
        }

        const { data, error } = await query;

        if (error || !data) {
            return errorResponse<GetProjectsResponse | null>(
                error?.message || "Failed to fetch projects",
                500
            );
        }

        const formattedData = data.map((project: any) => ({
            ...project,
            assigned_to_name: project.assigned_to_profile
                ? `${project.assigned_to_profile.first_name || ""} ${
                      project.assigned_to_profile.last_name || ""
                  }`.trim()
                : null,
            created_by_name: project.created_by_profile
                ? `${project.created_by_profile.first_name || ""} ${
                      project.created_by_profile.last_name || ""
                  }`.trim()
                : null,
        }));

        return successResponse<GetProjectsResponse | null>(
            formattedData,
            "Projects retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<GetProjectsResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
