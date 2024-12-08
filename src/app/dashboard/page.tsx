"use client";

import { FC, useState } from "react";
import Header from "./_components/Header";
import ProjectFilter from "./_components/ProjectFilter";
import ProjectList from "./_components/ProjectList";
import AddProjectButton from "./_components/AddProjectButton";

const Dashboard: FC = () => {
    const [filter, setFilter] = useState<string>("todos");

    const projects = [
        { id: 1, name: "Proyecto 1", status: "activo", date: "2024-01-01" },
        { id: 2, name: "Proyecto 2", status: "en progreso", date: "2024-02-15" },
        { id: 3, name: "Proyecto 3", status: "completado", date: "2024-03-10" },
    ];

    const handleViewDetails = (id: number) => {
        alert(`Ver detalles del proyecto ${id}`);
    };

    const handleEdit = (id: number) => {
        alert(`Editar proyecto ${id}`);
    };

    const handleAddProject = () => {
        alert("Nuevo proyecto agregado");
    };

    const handleLogout = () => {
        alert("Sesión cerrada");
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header onLogout={handleLogout} />

            <div className="p-6">
                <ProjectFilter filter={filter} onFilterChange={setFilter} />

                <ProjectList
                    projects={projects}
                    filter={filter}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEdit}
                />

                <AddProjectButton onAddProject={handleAddProject} />
            </div>
        </div>
    );
};

export default Dashboard;
