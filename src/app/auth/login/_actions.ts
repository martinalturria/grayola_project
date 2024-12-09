import { makeApiCall } from "@/lib/frontend/config_api";
import { LoginFormData } from "@/types/frontend/routes";
import { SuccessAlert, ErrorAlert } from "@/utils/frontend/toastUtils";

export const loginUser = async (formData: LoginFormData) => {
    try {
        const data = await makeApiCall("/auth/login", "POST", formData, false);

        const role = data.data.role;

        if (
            role !== "client" &&
            role !== "project_manager" &&
            role !== "designer"
        ) {
            ErrorAlert("Acceso denegado: El rol no está permitido.");
            return;
        }

        localStorage.setItem("auth_token", data.data.token);
        localStorage.setItem("role_user", role);

        SuccessAlert("Login exitoso");
    } catch (error: any) {
        ErrorAlert(error.message || "Ocurrió un error al iniciar sesión");
    }
};
