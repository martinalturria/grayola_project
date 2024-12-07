import { supabase } from "@/lib/supabase/supabase";
import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import { NextRequest, NextResponse } from "next/server";
import type {
    CreateProjectRequest,
    CreateProjectResponse,
} from "@/types/projects";
import { validateAuth } from "@/lib/middlewares/validate-auth";
import type { ApiResponse } from "@/types/api-response";

/**
 * POST /api/projects/create
 *
 * Endpoint to create a new project. Restricted to users with the role `project_manager`.
 *
 * @param {NextRequest} req - HTTP request containing project details in the body.
 * @returns {Promise<NextResponse<ApiResponse<CreateProjectResponse | null>>>} - Response with the created project details.
 */
export async function POST(
    req: NextRequest
): Promise<NextResponse<ApiResponse<CreateProjectResponse | null>>> {
    try {
        const authUser = await validateAuth(req, ["project_manager"]);
        if (authUser instanceof NextResponse) return authUser;

        const {
            title,
            description,
            assigned_to,
            status,
        }: CreateProjectRequest = await req.json();

        if (!title) {
            return errorResponse<CreateProjectResponse | null>(
                "Missing required field: title",
                400
            );
        }

        const { data, error } = await supabase
            .from("projects")
            .insert({
                title,
                description: description || null,
                assigned_to: assigned_to || null,
                status: status || "pending",
                created_by: authUser.id,
            })
            .select()
            .single();

        if (error || !data) {
            return errorResponse<CreateProjectResponse | null>(
                error?.message || "Failed to create project",
                500
            );
        }

        return successResponse<CreateProjectResponse | null>(
            {
                id: data.id,
                title: data.title,
                description: data.description,
                created_by: data.created_by,
                assigned_to: data.assigned_to,
                status: data.status,
                created_at: data.created_at,
            },
            "Project created successfully"
        );
    } catch (err: any) {
        return errorResponse<CreateProjectResponse | null>(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
