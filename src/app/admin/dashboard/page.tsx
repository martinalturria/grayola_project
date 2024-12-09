"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "../_components/AdminSidebar";
import UserTable from "../_components/UserTable";
import {
    deleteUser,
    getUsers,
    getUserById,
    updateUserRole,
} from "@/services/admin/admin_services";
import { ErrorAlert, SuccessAlert } from "@/utils/frontend/toastUtils";

export interface User {
    id: string;
    name: string;
    created_at: string;
    role: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
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
                    onEdit: (id: string) => handleEditRole(id),
                    onDelete: (id: string) => handleConfirmDelete(id), // Solo abre el modal para confirmar eliminación
                }));
                setUsers(mappedUsers);
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        setRoles(["superuser", "project_manager", "designer", "client"]);
        fetchUsers();
    }, [router]);

    // Maneja la edición del rol de un usuario
    const handleEditRole = async (id: string) => {
        try {
            const user = await getUserById(id);
            setCurrentUser(user);
            setNewRole(user.role_project);
            setIsModalOpen(true); // Abre el modal para editar
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
        }
    };

    // Actualiza el rol del usuario
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
                setIsModalOpen(false); // Cierra el modal
            } catch (error) {
                console.error("Error al actualizar el rol:", error);
            }
        } else {
            ErrorAlert("El rol no ha cambiado.");
        }
    };

    // Elimina al usuario
    const handleDeleteUser = async () => {
        if (currentUser) {
            try {
                const message = await deleteUser(currentUser.id);
                // Filtra los usuarios eliminados
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== currentUser.id)
                );
                SuccessAlert(message);
                setIsDeleteModalOpen(false); // Cierra el modal de eliminación
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                ErrorAlert("Hubo un error al eliminar el usuario.");
            }
        }
    };

    // Abre el modal de confirmación de eliminación
    const handleConfirmDelete = (id: string) => {
        const userToDelete = users.find((user) => user.id === id);
        if (userToDelete) {
            setCurrentUser(userToDelete); // Guarda al usuario a eliminar
            setIsDeleteModalOpen(true); // Abre el modal de confirmación
        }
    };
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <AdminSidebar onLogout={() => {}} />
            <div className="flex-1 p-6 overflow-x-auto">
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Dashboard
                </h1>
                <UserTable users={users} />

                {/* Modal de edición */}
                {isModalOpen && currentUser && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl mb-4">
                                Editar Rol de {currentUser.name}
                            </h2>
                            <div className="mb-4">
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
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                                    className="px-4 py-2 bg-gray-300 text-black rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpdateRole}
                                    className="px-4 py-2 bg-green-500 text-white rounded"
                                >
                                    Actualizar Rol
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de confirmación de eliminación */}
                {isDeleteModalOpen && currentUser && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-semibold">
                                ¿Estás seguro de que deseas eliminar al usuario?
                            </h2>
                            <p>{currentUser.name}</p>
                            <div className="mt-4">
                                <button
                                    onClick={handleDeleteUser}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
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
