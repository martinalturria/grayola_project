"use client";

import { FC, useState, useEffect } from "react";
import { updateProject } from "@/services/projects/projects_services";
import { ErrorAlert, SuccessAlert } from "@/utils/frontend/toastUtils";

interface EditProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    initialTitle: string;
    initialDescription: string;
    initialStatus: string;
    initialAssignedTo: string | null;
    designers: any[];
    onProjectUpdated: (updatedData: any) => void;
}

const EditProjectModal: FC<EditProjectModalProps> = ({
    isOpen,
    onClose,
    projectId,
    initialTitle,
    initialDescription,
    initialStatus,
    initialAssignedTo,
    designers,
    onProjectUpdated,
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [status, setStatus] = useState(initialStatus);
    const [assignedTo, setAssignedTo] = useState<string | null>(
        initialAssignedTo
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
        setStatus(initialStatus);
        setAssignedTo(initialAssignedTo);
        console.log(initialAssignedTo);
    }, [initialTitle, initialDescription, initialStatus, initialAssignedTo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = {
                title,
                description,
                status,
                assigned_to: assignedTo,
            };

            await updateProject(projectId, updateData);

            SuccessAlert("Proyecto actualizado exitosamente");
            onProjectUpdated({ ...updateData });
            onClose();
        } catch (error: any) {
            ErrorAlert(error.message || "Error al actualizar el proyecto.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Editar Proyecto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Título"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Descripción"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="pending">Pendiente</option>
                        <option value="active">En curso</option>
                        <option value="completed">Completado</option>
                    </select>

                    <select
                        value={assignedTo || ""}
                        onChange={(e) => setAssignedTo(e.target.value || null)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Seleccione diseñador</option>
                        {designers.map((designer) => (
                            <option key={designer.id} value={designer.id}>
                                {designer.first_name} {designer.last_name}
                            </option>
                        ))}
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
                            {loading
                                ? "Actualizando..."
                                : "Actualizar Proyecto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
