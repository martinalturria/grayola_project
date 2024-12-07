import { successResponse, errorResponse } from "@/lib/middlewares/api-response";
import { supabase } from "@/lib/supabase/supabase";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";
import type {
    RegisterRequest,
    RegisterResponse,
    SupabaseUser,
} from "@/types/auth";
import type { NextResponse } from "next/server";

/**
 * POST /api/auth/register
 *
 * Endpoint para registrar un nuevo usuario con el rol por defecto `cliente`.
 * Realiza validaciones de datos (email y password), verifica si el correo ya está registrado
 * y crea un usuario en Supabase si todo es válido.
 *
 * @param {Request} req - La solicitud HTTP que contiene el cuerpo con `email` y `password`.
 * @returns {Promise<NextResponse<RegisterResponse>>} - Respuesta estandarizada con el resultado del registro.
 */
export async function POST(
    req: Request
): Promise<NextResponse<RegisterResponse>> {
    try {
        const { email, password }: RegisterRequest = await req.json();

        if (!email || !password) {
            return errorResponse(
                "Missing required fields: email or password",
                400
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse("Invalid email format", 400);
        }

        if (password.length < 8) {
            return errorResponse(
                "Password must be at least 8 characters long",
                400
            );
        }

        const { data: existingUsers, error: fetchError } =
            await supabaseAdmin.auth.admin.listUsers();

        if (fetchError) {
            return errorResponse(fetchError.message, 500);
        }

        const isEmailRegistered = (existingUsers.users as SupabaseUser[]).some(
            (user) => user.email === email
        );

        if (isEmailRegistered) {
            return errorResponse("Email is already registered", 400);
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role_project: "cliente",
                },
            },
        });

        if (error) {
            return errorResponse(error.message, 500);
        }

        return successResponse(
            {
                id: data.user?.id,
                email: data.user?.email,
                role: data.user?.user_metadata?.role_project,
            },
            "User registered successfully"
        );
    } catch (err: any) {
        return errorResponse(
            err.message || "An unexpected error occurred",
            500
        );
    }
}
