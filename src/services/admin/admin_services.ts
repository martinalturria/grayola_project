import { makeApiCall } from "@/lib/frontend/config_api";
import { LoginFormData } from "@/types/frontend/routes";
import { SuccessAlert, ErrorAlert } from "@/utils/frontend/toastUtils";


export const adminLogin = async (formData: LoginFormData) => {
    try {
        const data = await makeApiCall("/admin/login", "POST", formData, false);
        localStorage.setItem("TOKEN_ADMIN", data.data.token);

        SuccessAlert("Login exitoso");
    } catch (error: any) {
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const data = await makeApiCall("/admin/users", "GET", {}, true, true);

        if (data?.data) {
            return data.data;
        } else {
            throw new Error("No se encontraron usuarios.");
        }
    } catch (error: any) {
        ErrorAlert(
            error.message || "Ocurrió un error al obtener los usuarios."
        );
        throw error;
    }
};

export const getUserById = async (id: string) => {
    try {
        const data = await makeApiCall(
            `/admin/users/${id}`,
            "GET",
            {},
            true,
            true
        );

        if (data?.data) {
            return data.data;
        } else {
            throw new Error("No se encontró el usuario.");
        }
    } catch (error: any) {
        ErrorAlert(error.message || "Ocurrió un error al obtener el usuario.");
        throw error;
    }
};

export const updateUserRole = async (id: string, newRole: string) => {
    try {
        const data = await makeApiCall(
            `/admin/users/role/${id}`,
            "PATCH",
            { newRole },
            true,
            true
        );

        if (data?.success) {
            return data.message || "Rol de usuario actualizado exitosamente.";
        } else {
            throw new Error(
                data?.message || "No se pudo actualizar el rol del usuario."
            );
        }
    } catch (error: any) {
        ErrorAlert(
            error.message ||
                "Ocurrió un error al actualizar el rol del usuario."
        );
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    try {
        const data = await makeApiCall(
            `/admin/users/delete/${id}`,
            "DELETE",
            {},
            true,
            true
        );

        if (data?.success) {
            return data.message || "Usuario eliminado exitosamente.";
        } else {
            throw new Error(data?.message || "No se pudo eliminar el usuario.");
        }
    } catch (error: any) {
        ErrorAlert(error.message || "Ocurrió un error al eliminar el usuario.");
        throw error;
    }
};
