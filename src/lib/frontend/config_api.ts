const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const apiConfig = {
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
};

const getAuthToken = () => {
    return localStorage.getItem("auth_token");
};

export const makeApiCall = async (
    url: string,
    method: string,
    body: any,
    requiresAuth: boolean = false
) => {
    let headers: HeadersInit = { ...apiConfig.headers };

    if (requiresAuth) {
        const token = getAuthToken();
        if (token) {
            headers = {
                ...headers,
                Authorization: `Bearer ${token}`,
            };
        } else {
            throw new Error("No token found, please login.");
        }
    }

    const response = await fetch(`${apiConfig.baseUrl}${url}`, {
        method,
        headers,
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Error making API call");
    }

    return data;
};
