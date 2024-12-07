import { supabase } from "@/lib/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import { validateAuth } from "@/lib/middlewares/validate-auth";
import { NextRequest, NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api-response";
import type { GetProjectsResponse } from "@/types/projects";

/**
 * GET /api/projects
 *
 * Endpoint to retrieve projects. Accessible to users with roles `project_manager` or `designer`.
 * Designers can only see their assigned projects.
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
        ]);
        if (authUser instanceof NextResponse) return authUser;

        const query = supabase.from("projects").select("*");

        if (authUser.role === "designer") {
            query.eq("assigned_to", authUser.id);
        }

        const { data, error } = await query;

        if (error || !data) {
            return errorResponse<GetProjectsResponse | null>(
                error?.message || "Failed to fetch projects",
                500
            );
        }

        return successResponse<GetProjectsResponse | null>(
            data,
            "Projects retrieved successfully"
        );
    } catch (err: any) {
        return errorResponse<GetProjectsResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
