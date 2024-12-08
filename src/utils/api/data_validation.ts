import { errorResponse } from "@/lib/api/middlewares/api-response";
import type { ApiResponse } from "@/types/api/api-response";
import type { NextResponse } from "next/server";

/**
 * Validates email and password from a request payload.
 *
 * @param email - The email to validate.
 * @param password - The password to validate.
 * @returns {Promise<void | NextResponse<ApiResponse<T>>>} - Returns an error response if validation fails.
 */
export async function validateEmailAndPassword<T>(
    email: string,
    password: string
): Promise<void | NextResponse<ApiResponse<T>>> {
    if (!email || !password) {
        return errorResponse<T>(
            "Missing required fields: email or password",
            400
        );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return errorResponse<T>("Invalid email format", 400);
    }

    if (password.length < 8) {
        return errorResponse<T>(
            "Password must be at least 8 characters long",
            400
        );
    }
}
