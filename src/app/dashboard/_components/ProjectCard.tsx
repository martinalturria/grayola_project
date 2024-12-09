import { FC, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ProjectDetailModal from "./ProjectDetailModal"; 

interface ProjectCardProps {
    id: string;
    name: string;
    status: string;
    date: string;
    assignedToName?: string | null;
    createdByName?: string | null;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const translateStatus = (status: string) => {
    switch (status) {
        case "pending":
            return { text: "Pendiente", colorClass: "text-gray-400" };
        case "active":
            return { text: "En curso", colorClass: "text-warning" };
        case "completed":
            return { text: "Completado", colorClass: "text-accent" };
        default:
            return { text: status, colorClass: "text-gray-500" };
    }
};

const ProjectCard: FC<ProjectCardProps> = ({
    id,
    name,
    status,
    date,
    assignedToName,
    createdByName,
    onEdit,
    onDelete,
}) => {
    const { text, colorClass } = translateStatus(status);
    const role = localStorage.getItem("role_user");

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = () => {
       
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-sm h-auto">
            <div className="mb-3">
                <h2 className="text-lg text-center font-semibold text-primary truncate">
                    {name}
                </h2>
                <p className="text-xs text-center text-gray-500">
                    Fecha de creación: {new Date(date).toLocaleDateString()}
                </p>
                {assignedToName && (
                    <p className="text-xs text-center text-gray-500">
                        Asignado a: {assignedToName}
                    </p>
                )}
                {createdByName && (
                    <p className="text-xs text-center text-gray-500">
                        Creado por: {createdByName}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-between">
                <p className={`text-sm font-medium ${colorClass}`}>{text}</p>
                <div className="flex gap-3">
                    <button
                        onClick={handleViewDetails}
                        aria-label="Ver detalles"
                    >
                        <FaEye size={16} />
                    </button>

                    {role === "project_manager" && (
                        <>
                            <button
                                onClick={() => onEdit(id)}
                                aria-label="Editar proyecto"
                            >
                                <FaEdit size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(id)}
                                aria-label="Eliminar proyecto"
                            >
                                <FaTrash size={16} />
                            </button>
                        </>
                    )}
                </div>
            </div>

            <ProjectDetailModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={{
                    id,
                    title: name,
                    description: "Proyecto nuevo", 
                    created_by_name: createdByName || "No definido",
                    assigned_to_name: assignedToName || "No asignado",
                    status,
                    created_at: date,
                }}
            />
        </div>
    );
};

export default ProjectCard;
