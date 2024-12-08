"use client";

import { TextInputProps } from "@/types/frontend/components";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const TextInput: FC<TextInputProps> = ({
    id,
    name,
    label,
    type = "text",
    value,
    placeholder = "",
    required = false,
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-2"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={name}
                    type={showPassword ? "text" : type} 
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {type === "password" && (
                    <span
                        onClick={togglePasswordVisibility}
                        className="absolute text-xl right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-primary transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TextInput;
