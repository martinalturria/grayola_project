import { FC } from "react";

interface ProjectFilterProps {
    filter: string;
    onFilterChange: (filter: string) => void;
}

const ProjectFilter: FC<ProjectFilterProps> = ({ filter, onFilterChange }) => {
    return (
        <div className="mb-6">
            <select
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            >
                <option value="todos">Todos los proyectos</option>
                <option value="pending">Pendientes</option>
                <option value="active">En curso</option>
                <option value="completed">Completados</option>
            </select>
        </div>
    );
};

export default ProjectFilter;
