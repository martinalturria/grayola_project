import { toast, ToastOptions } from "react-toastify";

const alertOptions: ToastOptions = {
    draggable: true,
    closeOnClick: true,
    autoClose: 3000,
};

export const SuccessAlert = (text: string) => {
    toast.success(text, {
        toastId: text,
        ...alertOptions,
    });
};

export const ErrorAlert = (text: string) => {
    toast.error(text, {
        toastId: text,
        ...alertOptions,
    });
};

export const WarningAlert = (text: string) => {
    toast.warn(text, {
        toastId: text,
        ...alertOptions,
    });
};
