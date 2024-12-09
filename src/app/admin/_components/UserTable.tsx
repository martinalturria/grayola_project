import { FC } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { User } from "../dashboard/page";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const UserTable: FC<{
    users: User[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}> = ({ users, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-3 border-b text-sm font-semibold">
                            Nombre
                        </th>
                        <th className="px-4 py-3 border-b text-sm font-semibold">
                            Fecha de Creación
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
                            <td className="px-4 py-3 border-b">
                                {user.created_at
                                    ? formatDate(user.created_at)
                                    : "N/A"}
                            </td>
                            <td className="px-4 py-3 border-b">{user.role}</td>
                            <td className="px-4 py-3 border-b flex justify-end gap-3">
                                <button
                                    onClick={() => onEdit(user.id)}
                                    className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-300 text-black hover:bg-gray-400 transition-all"
                                >
                                    <FaEdit className="mr-1" />
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)} 
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
