import { makeApiCall } from "@/lib/frontend/config_api";
import { RegisterFormData } from "@/types/frontend/routes";
import { SuccessAlert, ErrorAlert } from "@/utils/frontend/toastUtils";

export const registerUser = async (dataToSend: RegisterFormData) => {
    try {
        const data = await makeApiCall(
            "/auth/register",
            "POST",
            dataToSend,
            false
        );

        SuccessAlert("Cuenta registrada exitosamente");

    } catch (error: any) {
        ErrorAlert(error.message || "Ocurrió un error al registrar la cuenta");
    }
};
