export type DesignerUser = {
    id: string;
    first_name: string;
    last_name: string;
    role_project: string;
    created_at: string;
};

export type GetDesignerUsersResponse = DesignerUser[];