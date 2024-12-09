"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "./_components/Header";
import ProjectFilter from "./_components/ProjectFilter";
import ProjectList from "./_components/ProjectList";
import AddProjectButton from "./_components/AddProjectButton";
import { getProjects } from "@/services/projects/projects_services";
import CreateProjectModal from "./_components/CreateProjectModal";
import { FaSpinner } from "react-icons/fa";

const Dashboard: FC = () => {
    const [filter, setFilter] = useState<string>("todos");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [projects, setProjects] = useState<any[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [canCreate, setCanCreate] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const projectList = await getProjects();
            setProjects(projectList);
            setFilteredProjects(projectList);
        } catch (error: any) {
            setError(error.message || "Error al cargar los proyectos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            router.push("/");
            return;
        }

        const role = localStorage.getItem("role_user");
        if (role === "client" || role === "project_manager") {
            setCanCreate(true);
        }

        fetchProjects();
    }, [router]);

    useEffect(() => {
        const filtered = projects.filter((project) =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProjects(filtered);
    }, [searchQuery, projects]);

    const handleLogout = () => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role_user");
        router.push("/");
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleProjectCreated = () => {
        fetchProjects();
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-opacity-50 bg-gray-500">
                <FaSpinner className="animate-spin text-primary text-4xl" />
            </div>
        );
    }

    if (error) return <div>{error}</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header onLogout={handleLogout} setSearchQuery={setSearchQuery} />
            <div className="p-6">
                <ProjectFilter filter={filter} onFilterChange={setFilter} />
                <ProjectList
                    projects={filteredProjects}
                    filter={filter}
                    fetchProjects={fetchProjects}
                />
                {canCreate && (
                    <AddProjectButton onAddProject={handleOpenModal} />
                )}
            </div>
            <CreateProjectModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onProjectCreated={handleProjectCreated}
            />
        </div>
    );
};

export default Dashboard;
