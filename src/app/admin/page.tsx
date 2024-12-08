"use client";

import { FC } from "react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import TextInput from "@/components/forms/TextInput";
import { FaArrowLeft } from "react-icons/fa";

const AdminLogin: FC = () => {
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

                    <form className="space-y-4">
                        <TextInput
                            id="email"
                            name="email"
                            label="Correo Electrónico"
                            type="email"
                            required
                            value={""}
                            onChange={function (
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                        <TextInput
                            id="password"
                            name="password"
                            label="Contraseña"
                            type="password"
                            required
                            value={""}
                            onChange={function (
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void {
                                throw new Error("Function not implemented.");
                            }}
                        />
                        <div className="flex justify-center">
                            <Button type="submit" variant="primary">
                                Iniciar sesión
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
                        src="/images/login_admin.webp"
                        alt="Formulario de Login Admin"
                        width={600}
                        height={600}
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
