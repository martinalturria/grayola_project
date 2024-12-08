import { makeApiCall } from "@/lib/frontend/config_api";
import { LoginFormData } from "@/types/frontend/routes";
import { SuccessAlert, ErrorAlert } from "@/utils/frontend/toastUtils";

export const loginUser = async (formData: LoginFormData) => {
    try {
        const data = await makeApiCall("/auth/login", "POST", formData, false);

        localStorage.setItem("auth_token", data.token);

        SuccessAlert("Login exitoso");

    } catch (error: any) {
        ErrorAlert(error.message || "Ocurrió un error al iniciar sesión");
    }
};
