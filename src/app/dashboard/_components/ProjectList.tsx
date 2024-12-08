import { FC } from "react";
import ProjectCard from "./ProjectCard";

interface Project {
    id: number;
    name: string;
    status: string;
    date: string;
}

interface ProjectListProps {
    projects: Project[];
    filter: string;
    onViewDetails: (id: number) => void;
    onEdit: (id: number) => void;
}

const ProjectList: FC<ProjectListProps> = ({
    projects,
    filter,
    onViewDetails,
    onEdit,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto max-h-screen">
            {projects
                .filter(
                    (project) => filter === "todos" || project.status === filter
                )
                .map((project) => (
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        status={project.status}
                        date={project.date}
                        onViewDetails={onViewDetails}
                        onEdit={onEdit}
                    />
                ))}
        </div>
    );
};

export default ProjectList;
