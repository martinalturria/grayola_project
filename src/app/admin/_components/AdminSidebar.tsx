"use client";

import { FC, useState } from "react";
import { FaUsers, FaSignOutAlt, FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminSidebarProps {
    onLogout: () => void;
}

const AdminSidebar: FC<AdminSidebarProps> = ({ onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const router = useRouter();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("TOKEN_ADMIN");
        router.push("/");
    };

    return (
        <aside
            className={`bg-primary text-white ${
                isSidebarOpen ? "w-64" : "w-20"
            } min-h-screen flex flex-col justify-between p-6 transition-width duration-300`}
        >
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden text-white"
                >
                    <FaBars size={24} />
                </button>
                {isSidebarOpen && (
                    <div className="flex justify-center w-full">
                        <Image
                            src="/images/logo.png"
                            alt="Logo"
                            width={150}
                            height={50}
                            className="object-contain"
                        />
                    </div>
                )}
            </div>

            <nav>
                <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-secondary transition"
                >
                    <FaUsers size={20} />
                    {isSidebarOpen && (
                        <span className="font-semibold">Users</span>
                    )}
                </Link>
            </nav>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm hover:underline text-white mt-auto"
            >
                <FaSignOutAlt />
                {isSidebarOpen && <span>Logout</span>}
            </button>
        </aside>
    );
};

export default AdminSidebar;
