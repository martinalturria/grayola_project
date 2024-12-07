import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api-response";

export const successResponse = <T>(
    data: T,
    message = "Operation completed successfully."
) => {
    return NextResponse.json<ApiResponse<T>>({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (message = "An error occurred.", status = 500) => {
    return NextResponse.json<ApiResponse<null>>(
        {
            success: false,
            message,
            data: null,
        },
        { status }
    );
};
