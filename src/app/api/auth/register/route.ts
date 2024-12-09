import { supabase } from "@/lib/api/supabase/supabase";
import { supabaseAdmin } from "@/lib/api/supabase/supabase-admin";
import { successResponse, errorResponse } from "@/lib/api/middlewares/api-response";
import type { RegisterRequest, RegisterResponse } from "@/types/api/auth";
import type { NextResponse } from "next/server";
import { validateEmailAndPassword } from "@/utils/api/data_validation";

/**
 * POST /api/auth/register
 *
 * Endpoint to register a new user with the default role `cliente`.
 *
 * @param {Request} req - HTTP request containing `email`, `password`, `nombre`, and `apellido` in the body.
 * @returns {Promise<NextResponse<RegisterResponse>>} - Response with the result of the registration.
 */
export async function POST(
    req: Request
): Promise<NextResponse<RegisterResponse>> {
    try {
        const { email, password, nombre, apellido }: RegisterRequest =
            await req.json();

        const validationError = await validateEmailAndPassword<
            RegisterResponse["data"]
        >(email, password);
        if (validationError) return validationError;

        const { data: userData, error: signUpError } =
            await supabase.auth.signUp({
                email,
                password,
            });

        if (signUpError || !userData.user) {
            return errorResponse<RegisterResponse["data"]>(
                signUpError?.message || "Error al registrar el usuario",
                500
            );
        }

        const userId = userData.user.id;

        const { error: profileError } = await supabase.from("profile").insert({
            id: userId,
            first_name: nombre || null,
            last_name: apellido || null,
            role_project: "client",
        });

        if (profileError) {
            await supabaseAdmin.auth.admin.deleteUser(userId);
            return errorResponse<RegisterResponse["data"]>(
                "Error al crear el perfil de usuario",
                500
            );
        }

        return successResponse<RegisterResponse["data"]>(
            {
                id: userId,
                email: userData.user.email || "",
                role: "client",
            },
            "Usuario registrado exitosamente"
        );
    } catch (err: any) {
        return errorResponse<RegisterResponse["data"]>(
            err.message || "Ocurrió un error inesperado",
            500
        );
    }
}
