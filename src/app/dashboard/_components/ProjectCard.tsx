import { FC } from "react";
import { FaEye, FaEdit } from "react-icons/fa";

interface ProjectCardProps {
    id: number;
    name: string;
    status: string;
    date: string;
    onViewDetails: (id: number) => void;
    onEdit: (id: number) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
    id,
    name,
    status,
    date,
    onViewDetails,
    onEdit,
}) => {
    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-sm">
            <div className="mb-3">
                <h2 className="text-lg text-center font-semibold text-primary truncate">
                    <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        {name}
                    </span>
                </h2>
                <p className="text-xs text-center text-gray-500">
                    <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        Fecha: {date}
                    </span>
                </p>
            </div>
            <div className="flex items-center justify-between">
                <p
                    className={`text-sm font-medium ${
                        status === "activo"
                            ? "text-accent"
                            : status === "en progreso"
                            ? "text-warning"
                            : "text-gray-400"
                    }`}
                >
                    {status}
                </p>
                <div className="flex gap-3">
                    <button
                        className="text-primary hover:text-secondary p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={() => onViewDetails(id)}
                        aria-label="Ver detalles"
                    >
                        <FaEye size={16} />
                    </button>
                    <button
                        className="text-primary hover:text-secondary p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        onClick={() => onEdit(id)}
                        aria-label="Editar proyecto"
                    >
                        <FaEdit size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
