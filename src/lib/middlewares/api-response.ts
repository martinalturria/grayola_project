import { NextResponse } from "next/server";
import type { ApiResponse } from "@/types/api-response";

export const successResponse = <T>(
    data: T,
    message = "Operation completed successfully."
): NextResponse<ApiResponse<T>> => {
    return NextResponse.json<ApiResponse<T>>({
        success: true,
        message,
        data,
    });
};

export const errorResponse = <T = null>(
    message = "An error occurred.",
    status = 500
): NextResponse<ApiResponse<T>> => {
    return NextResponse.json<ApiResponse<T>>(
        {
            success: false,
            message,
            data: null as T,
        },
        { status }
    );
};
