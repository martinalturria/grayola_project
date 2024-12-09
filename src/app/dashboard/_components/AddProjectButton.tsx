import { FC } from "react";
import { FaPlus } from "react-icons/fa";

interface FloatingAddButtonProps {
    onAddProject: () => void;
}

const FloatingAddButton: FC<FloatingAddButtonProps> = ({ onAddProject }) => {
    return (
        <button
            onClick={onAddProject}
            className="fixed bottom-20 right-20 bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-secondary flex items-center justify-center"
            aria-label="Agregar nuevo proyecto"
        >
            <FaPlus size={16} />
        </button>
    );
};

export default FloatingAddButton;
