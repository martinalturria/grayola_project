import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-6 py-12">
            <header className="text-center mb-16">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/images/logo.png"
                        alt="Grayola.io Logo"
                        width={250}
                        height={250}
                        priority
                    />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold md:mt-28">
                    Bienvenido a Grayola.io
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-gray-600">
                    Una plataforma moderna para gestionar proyectos y colaborar
                    eficientemente.
                </p>
            </header>

            <section className="text-center max-w-3xl mb-20 px-4">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
                    ¿Por qué elegir Grayola.io?
                </h2>
                <p className="text-gray-700 sm:text-lg">
                    Grayola.io ofrece gestión de proyectos, paneles de control
                    específicos por roles y colaboración fluida para equipos de
                    todos los tamaños. Descubre la simplicidad y eficiencia de
                    trabajar de manera más inteligente.
                </p>
            </section>

            <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/auth/login">
                    <div className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-secondary transition text-center">
                        Iniciar Sesión
                    </div>
                </Link>
                <Link href="/auth/register">
                    <div className="px-6 py-3 bg-secondary text-white rounded-lg shadow-lg hover:bg-primary transition text-center">
                        Registrarse
                    </div>
                </Link>
            </div>

            <footer className="mt-auto pt-12 text-sm sm:text-base text-gray-500">
                © {new Date().getFullYear()} Grayola.io. Todos los derechos
                reservados.
            </footer>
        </div>
    );
}
