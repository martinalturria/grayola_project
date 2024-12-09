"use client";

import { FC } from "react";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProjectDeleted: () => void;
    projectId: string;
}

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({
    isOpen,
    onClose,
    onProjectDeleted,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">¿Estás seguro de eliminar este proyecto?</h2>
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onProjectDeleted();
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
