"use client";

import { ButtonProps } from "@/types/frontend/components";
import { FC } from "react";

const Button: FC<ButtonProps> = ({
    type = "button",
    onClick,
    children,
    variant = "primary",
}) => {
    const baseStyles =
        "w-2/3 mx-auto py-2 px-4 font-semibold rounded-lg shadow-lg transition";
    const variantStyles =
        variant === "primary"
            ? "bg-primary text-white hover:bg-secondary"
            : "border border-secondary text-secondary hover:bg-secondary hover:text-white";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles}`}
        >
            {children}
        </button>
    );
};

export default Button;
