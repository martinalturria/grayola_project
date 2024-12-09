"use client";

import { FC, useState } from "react";
import { createProject } from "@/services/projects/projects_services";
import { ErrorAlert, SuccessAlert } from "@/utils/frontend/toastUtils";

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectCreated: () => void; 
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({
    isOpen,
    onClose,
    onProjectCreated,
}) => {
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        status: "pending",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProjectData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createProject(projectData);
            SuccessAlert("Proyecto creado exitosamente");
            onProjectCreated(); 
            onClose();
        } catch (error: any) {
            ErrorAlert(error.message || "Error al crear el proyecto.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Crear Proyecto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        placeholder="Título"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        name="description"
                        value={projectData.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <select
                        name="status"
                        value={projectData.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="pending">Pendiente</option>
                        <option value="active">Activo</option>
                        <option value="completed">Completado</option>
                    </select>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-md"
                            disabled={loading}
                        >
                            {loading ? "Creando..." : "Crear Proyecto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;
