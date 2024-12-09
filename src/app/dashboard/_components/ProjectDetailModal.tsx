import { FC } from "react";
import { FaTimes } from "react-icons/fa";

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id: string;
        title: string;
        description: string;
        created_by_name: string;
        assigned_to_name: string;
        status: string;
        created_at: string;
    };
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

const ProjectDetailModal: FC<ProjectDetailModalProps> = ({
    isOpen,
    onClose,
    project,
}) => {
    const { text, colorClass } = translateStatus(project.status);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-primary">
                        Detalles del Proyecto
                    </h2>
                    <span onClick={onClose} aria-label="Cerrar">
                        <FaTimes
                            size={20}
                            className="text-gray-500 hover:text-gray-700"
                        />
                    </span>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">
                        <strong>Título:</strong> {project.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Descripción:</strong> {project.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Creado por:</strong> {project.created_by_name}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Asignado a:</strong> {project.assigned_to_name}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Estado:</strong>{" "}
                        <span className={`font-medium ${colorClass}`}>
                            {text}
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        <strong>Fecha de creación:</strong>{" "}
                        {new Date(project.created_at).toLocaleDateString()}
                    </p>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
