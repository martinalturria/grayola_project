"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../_components/AdminSidebar";
import UserTable from "../_components/UserTable";
import {
    deleteUser,
    getUsers,
    updateUserRole,
} from "@/services/admin/admin_services";
import { ErrorAlert, SuccessAlert } from "@/utils/frontend/toastUtils";

export interface User {
    id: string;
    name: string;
    created_at: string;
    role: string;
}

const AdminDashboard: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [newRole, setNewRole] = useState("");
    const [roles, setRoles] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem("TOKEN_ADMIN");
            if (!token) {
                router.push("/admin");
            }
        };

        checkAuthentication();

        const fetchUsers = async () => {
            try {
                const usersData = await getUsers();
                const mappedUsers = usersData.map((user: any) => ({
                    id: user.id,
                    name: `${user.first_name} ${user.last_name}`,
                    created_at: `${user.created_at}`,
                    role: user.role_project,
                }));
                setUsers(mappedUsers);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        setRoles(["superuser", "project_manager", "designer", "client"]);
        fetchUsers();
    }, [router]);

    const handleEditRole = (id: string) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            setCurrentUser(user);
            setNewRole(user.role);
            setIsModalOpen(true);
        }
    };

    const handleUpdateRole = async () => {
        if (currentUser && newRole !== currentUser.role) {
            try {
                await updateUserRole(currentUser.id, newRole);
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === currentUser.id
                            ? { ...user, role: newRole }
                            : user
                    )
                );
                SuccessAlert("Rol actualizado exitosamente.");
                setIsModalOpen(false);
            } catch (error) {
                console.error("Error al actualizar el rol:", error);
            }
        } else {
            ErrorAlert("El rol no ha cambiado.");
        }
    };

    const handleDeleteUser = async (id: string) => {
        try {
            const message = await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            SuccessAlert(message);
            setIsDeleteModalOpen(false); 
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            ErrorAlert("Hubo un error al eliminar el usuario.");
        }
    };

    const handleConfirmDelete = (id: string) => {
        const userToDelete = users.find((user) => user.id === id);
        if (userToDelete) {
            setCurrentUser(userToDelete);
            setIsDeleteModalOpen(true);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <AdminSidebar onLogout={() => {}} />
            <div className="flex-1 p-6 overflow-x-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Dashboard
                </h1>
                <UserTable
                    users={users}
                    onEdit={handleEditRole}
                    onDelete={handleConfirmDelete}
                />{" "}
                {isModalOpen && currentUser && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold text-center mb-6">
                                Editar Rol de {currentUser.name}
                            </h2>
                            <div className="mb-6">
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Rol
                                </label>
                                <select
                                    id="role"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm py-2 px-3"
                                >
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpdateRole}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                >
                                    Actualizar Rol
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isDeleteModalOpen && currentUser && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-semibold text-center mb-4">
                                ¿Estás seguro de que deseas eliminar a este
                                usuario?
                            </h2>
                            <p className="text-center font-bold">
                                {currentUser.name}
                            </p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() =>
                                        handleDeleteUser(currentUser.id)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
