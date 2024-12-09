export interface CreateProjectRequest {
    title: string;
    description?: string | null;
    assigned_to?: string | null;
    status?: string;
    files?: File[]; 
}

export type CreateProjectResponse = {
    id: string;
    title: string;
    description: string | null;
    created_by: string;
    assigned_to: string | null;
    assigned_to_name?: string | null;
    status: string;
    created_at: string;
    file_urls?: string[]; 
} | null;

export type Project = {
    id: string;
    title: string;
    description: string | null;
    created_by: string;
    assigned_to: string | null;
    status: string;
    created_at: string;
    assigned_to_profile?: {
        id: string;
        first_name: string | null;
        last_name: string | null;
    } | null;
    files?:
        | {
              id: string;
              file_url: string;
          }[]
        | null;
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
    assigned_to_name?: string | null;
    status: string;
    created_at: string;
    updated_at: string;
};

export type DeleteProjectResponse = {
    id: string;
    message: string;
} | null;

export interface AssignProjectRequest {
    assigned_to: string;
}

export type AssignProjectResponse = {
    id: string;
    assigned_to: string;
    assigned_to_name?: string | null;
};
