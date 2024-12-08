"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import TextInput from "@/components/forms/TextInput";
import { FaArrowLeft } from "react-icons/fa";
import { ErrorAlert } from "@/utils/frontend/toastUtils";
import { loginUser } from "./_actions";

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            ErrorAlert("Por favor ingresa tu correo y contraseña.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            ErrorAlert("El correo electrónico no es válido.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            await loginUser(formData);
        } catch (error) {
            ErrorAlert("Ocurrió un error al iniciar sesión.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                <div className="flex-1 flex flex-col p-6">
                    <Link
                        href="/"
                        className="mb-4 flex items-center text-primary hover:text-secondary"
                    >
                        <FaArrowLeft className="text-xl mr-2" />
                    </Link>

                    <h2 className="text-2xl font-bold mb-4 text-center text-primary">
                        Iniciar sesión
                    </h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Ingresa tus datos para acceder a tu cuenta y gestionar
                        tus proyectos.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextInput
                            id="email"
                            name="email"
                            label="Correo Electrónico"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <TextInput
                            id="password"
                            name="password"
                            label="Contraseña"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex justify-center">
                            <Button type="submit" variant="primary">
                                {loading
                                    ? "Iniciando sesión..."
                                    : "Iniciar sesión"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-4 text-sm text-center">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/auth/register">
                            <span className="text-primary hover:underline">
                                Regístrate aquí
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center">
                    <Image
                        src="/images/form.png"
                        alt="Formulario de Login"
                        width={600}
                        height={600}
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
