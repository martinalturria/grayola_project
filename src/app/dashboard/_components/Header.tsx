"use client";

import { FC } from "react";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";

interface HeaderProps {
    onLogout: () => void;
    setSearchQuery: (query: string) => void; 
}

const Header: FC<HeaderProps> = ({ onLogout, setSearchQuery }) => {
    return (
        <header className="bg-white shadow-md p-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className="object-contain"
                    />
                </div>

                <div className="hidden sm:flex flex-grow justify-center mx-4">
                    <input
                        type="text"
                        placeholder="Buscar proyecto..."
                        className="w-[40%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado
                    />
                </div>

                <div className="flex items-center">
                    <span
                        onClick={onLogout}
                        className="text-gray-500 hover:text-secondary cursor-pointer text-xl"
                    >
                        <FaSignOutAlt />
                    </span>
                </div>
            </div>

            <div className="flex sm:hidden mt-4 justify-center">
                <input
                    type="text"
                    placeholder="Buscar proyecto..."
                    className="w-[80%] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado
                />
            </div>
        </header>
    );
};

export default Header;
