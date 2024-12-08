export interface RegisterFormData {
    nombre: string;
    apellido: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data?: {
        id: string;
        email: string;
        role: string;
        token: string;
    };
}
