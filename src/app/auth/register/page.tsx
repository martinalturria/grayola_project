"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import TextInput from "@/components/forms/TextInput";
import { FaArrowLeft } from "react-icons/fa";
import { ErrorAlert } from "@/utils/frontend/toastUtils";
import { registerUser } from "./_actions";

interface RegisterFormData {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    confirmarContraseña: string;
}

export default function Register() {
    const [formData, setFormData] = useState<RegisterFormData>({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmarContraseña: "",
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
        if (
            !formData.nombre ||
            !formData.apellido ||
            !formData.email ||
            !formData.password ||
            !formData.confirmarContraseña
        ) {
            ErrorAlert("Por favor completa todos los campos.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            ErrorAlert("El correo electrónico no es válido.");
            return false;
        }

        if (formData.password !== formData.confirmarContraseña) {
            ErrorAlert("Las contraseñas no coinciden.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        const { confirmarContraseña, ...dataToSend } = formData;

        try {
            await registerUser(dataToSend);
        } catch (error) {
            ErrorAlert("Ocurrió un error al registrar la cuenta.");
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

                    <h2 className="text-2xl text-center font-bold mb-4 text-primary">
                        Crear una cuenta
                    </h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Ingresa tus datos para registrarte y comenzar a
                        gestionar tus proyectos.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextInput
                            id="nombre"
                            name="nombre"
                            label="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                        <TextInput
                            id="apellido"
                            name="apellido"
                            label="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
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
                        <TextInput
                            id="confirmarContraseña"
                            name="confirmarContraseña"
                            label="Confirmar Contraseña"
                            type="password"
                            value={formData.confirmarContraseña}
                            onChange={handleChange}
                            required
                        />
                        <div className="flex justify-center">
                            <Button type="submit" variant="primary">
                                {loading ? "Registrando..." : "Registrarse"}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-4 text-sm text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/auth/login">
                            <span className="text-primary hover:underline">
                                Inicia sesión
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center">
                    <Image
                        src="/images/form.png"
                        alt="Formulario de Registro"
                        width={600}
                        height={600}
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
