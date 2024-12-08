"use client";

import { FC } from "react";
import AdminSidebar from "../_components/AdminSidebar";
import UserTable from "../_components/UserTable";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const AdminDashboard: FC = () => {
    const users: User[] = [
        { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "Admin" },
        {
            id: 2,
            name: "María Gómez",
            email: "maria@example.com",
            role: "User",
        },
        {
            id: 3,
            name: "Carlos López",
            email: "carlos@example.com",
            role: "User",
        },
    ];

    const handleEditRole = (id: number) => {
        alert(`Editar rol del usuario con id: ${id}`);
    };

    const handleDeleteUser = (id: number) => {
        alert(`Eliminar usuario con id: ${id}`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <AdminSidebar onLogout={() => {}} />
            <div className="flex-1 p-6 overflow-x-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Dashboard
                </h1>
                <UserTable
                    users={users.map((user) => ({
                        ...user,
                        onEdit: handleEditRole,
                        onDelete: handleDeleteUser,
                    }))}
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
