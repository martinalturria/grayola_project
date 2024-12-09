import { makeApiCall } from "@/lib/frontend/config_api";

export interface Project {
    id: string;
    title: string;
    description: string;
    created_by: string;
    assigned_to: string;
    status: string;
    created_at: string;
    assigned_to_name?: string | null;
    created_by_name?: string | null;
}

interface CreateProjectRequest {
    title: string;
    description?: string;
    assigned_to?: string;
    status?: string;
}

interface UpdateProjectRequest {
    title?: string;
    description?: string;
    assigned_to?: string | null;
    status?: string;
}

interface Designer {
    id: string;
    first_name: string;
    last_name: string;
    role_project: string;
    created_at: string;
}

export const getProjects = async () => {
    try {
        const data = await makeApiCall("/projects", "GET", {}, true);

        if (data?.data) {
            return data.data as Project[];
        } else {
            throw new Error("No se encontraron proyectos.");
        }
    } catch (error: any) {
        throw new Error(
            error.message || "Ocurrió un error al obtener los proyectos."
        );
    }
};

export const getProjectById = async (id: string) => {
    try {
        const data = await makeApiCall(`/projects/${id}`, "GET", {}, true);

        if (data?.data) {
            return data.data as Project;
        } else {
            throw new Error("Proyecto no encontrado.");
        }
    } catch (error: any) {
        throw new Error(
            error.message || "Ocurrió un error al obtener el proyecto."
        );
    }
};

export const createProject = async (projectData: CreateProjectRequest) => {
    try {
        const data = await makeApiCall(
            "/projects/create",
            "POST",
            projectData,
            true
        );

        if (data?.data) {
            return data.data as Project;
        } else {
            throw new Error("Error al crear el proyecto.");
        }
    } catch (error: any) {
        throw new Error(
            error.message || "Ocurrió un error al crear el proyecto."
        );
    }
};

export const updateProject = async (
    id: string,
    projectData: UpdateProjectRequest
) => {
    try {
        const data = await makeApiCall(
            `/projects/update/${id}`,
            "PUT",
            projectData,
            true
        );

        if (data?.data) {
            return data.data as Project;
        } else {
            throw new Error("Error al actualizar el proyecto.");
        }
    } catch (error: any) {
        throw new Error(
            error.message || "Ocurrió un error al actualizar el proyecto."
        );
    }
};

export const deleteProject = async (id: string) => {
    try {
        const data = await makeApiCall(
            `/projects/delete/${id}`,
            "DELETE",
            {},
            true
        );

        if (data?.data) {
            return data.data;
        } else {
            throw new Error("Error al eliminar el proyecto.");
        }
    } catch (error: any) {
        throw new Error(
            error.message || "Ocurrió un error al eliminar el proyecto."
        );
    }
};

export const getDesigners = async () => {
    try {
        const data = await makeApiCall("/users/designers", "GET", {}, true);

        if (data?.data) {
            return data.data as Designer[];
        } else {
            throw new Error("No se encontraron diseñadores.");
        }
    } catch (error: any) {
        throw new Error(
            error.message || "Ocurrió un error al obtener los diseñadores."
        );
    }
};
