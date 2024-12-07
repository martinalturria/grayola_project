export interface CreateProjectRequest {
    title: string;
    description?: string | null;
    assigned_to?: string | null;
    status?: string;
}

export type CreateProjectResponse = {
    id: string;
    title: string;
    description: string | null;
    created_by: string;
    assigned_to: string | null;
    status: string;
    created_at: string;
} | null;

export type Project = {
    id: string;
    title: string;
    description: string | null;
    created_by: string;
    assigned_to: string | null;
    status: string;
    created_at: string;
};

export type GetProjectsResponse = Project[];

export type GetProjectByIdResponse = Project | null;

export interface UpdateProjectRequest {
    id: string;
    title?: string;
    description?: string | null;
    assigned_to?: string | null;
    status?: string;
}

export type UpdateProjectResponse = {
    id: string;
    title: string;
    description: string | null;
    created_by: string;
    assigned_to: string | null;
    status: string;
    created_at: string;
    updated_at: string;
};

export type DeleteProjectResponse = {
    id: string; 
    message: string; 
} | null;
