import { FC, useState } from "react";
import ProjectCard from "./ProjectCard";
import { deleteProject } from "@/services/projects/projects_services";
import { updateProject } from "@/services/projects/projects_services";
import { getProjectById } from "@/services/projects/projects_services"; 
import EditProjectModal from "./EditProjectModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { SuccessAlert } from "@/utils/frontend/toastUtils";

interface Project {
    id: string;
    title: string;
    status: string;
    created_at: string;
    assigned_to_name?: string | null;
    created_by_name?: string | null;
}

interface ProjectListProps {
    projects: Project[];
    filter: string;
    onViewDetails: (id: string) => void;
    fetchProjects: () => void;
}

const ProjectList: FC<ProjectListProps> = ({
    projects,
    filter,
    onViewDetails,
    fetchProjects,
}) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
        null
    );
    const [selectedProjectData, setSelectedProjectData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEdit = async (id: string) => {
        setSelectedProjectId(id);
        try {
            const project = await getProjectById(id);
            setSelectedProjectData(project);
            setShowEditModal(true);
        } catch (error: any) {
            setError(
                error.message || "Error al obtener los detalles del proyecto."
            );
        }
    };

    const handleDelete = (id: string) => {
        setSelectedProjectId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedProjectId) {
            try {
                setLoading(true);
                await deleteProject(selectedProjectId);
                setShowDeleteModal(false);
                SuccessAlert("Proyecto eliminado exitosamente");
                fetchProjects();
            } catch (error: any) {
                setError(error.message || "Error al eliminar el proyecto.");
            } finally {
                setLoading(false);
            }
        }
    };

    const handleUpdate = async (updatedData: any) => {
        if (selectedProjectId) {
            try {
                setLoading(true);
                await updateProject(selectedProjectId, updatedData);
                setShowEditModal(false);
                SuccessAlert("Proyecto actualizado exitosamente");
                fetchProjects();
            } catch (error: any) {
                setError(error.message || "Error al actualizar el proyecto.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto max-h-screen">
                {projects
                    .filter(
                        (project) =>
                            filter === "todos" || project.status === filter
                    )
                    .map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.title}
                            status={project.status}
                            date={project.created_at}
                            assignedToName={project.assigned_to_name}
                            createdByName={project.created_by_name}
                            onViewDetails={onViewDetails}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
            </div>

            {showEditModal && selectedProjectData && (
                <EditProjectModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    projectId={selectedProjectId!}
                    initialTitle={selectedProjectData.title}
                    initialDescription={selectedProjectData.description}
                    initialStatus={selectedProjectData.status} 
                    onProjectUpdated={handleUpdate}
                />
            )}

            {showDeleteModal && (
                <ConfirmDeleteModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onProjectDeleted={handleConfirmDelete}
                    projectId={selectedProjectId!}
                />
            )}

            {error && <div>{error}</div>}
        </>
    );
};

export default ProjectList;
