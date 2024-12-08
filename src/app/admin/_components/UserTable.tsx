import { FC } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const UserTable: FC<{ users: User[] }> = ({ users }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-3 border-b text-sm font-semibold">
                            Nombre
                        </th>
                        <th className="px-4 py-3 border-b text-sm font-semibold">
                            Correo Electrónico
                        </th>
                        <th className="px-4 py-3 border-b text-sm font-semibold">
                            Rol
                        </th>
                        <th className="px-10 py-3 border-b text-sm font-semibold text-right">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border-b">{user.name}</td>
                            <td className="px-4 py-3 border-b">{user.email}</td>
                            <td className="px-4 py-3 border-b">{user.role}</td>
                            <td className="px-4 py-3 border-b flex justify-end gap-3">
                                <button
                                    onClick={() => user.onEdit(user.id)}
                                    className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-300 text-black hover:bg-gray-400 transition-all"
                                >
                                    <FaEdit className="mr-1" />
                                </button>

                                <button
                                    onClick={() => user.onDelete(user.id)}
                                    className="px-3 py-1 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                                >
                                    <FaTrashAlt className="mr-1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
