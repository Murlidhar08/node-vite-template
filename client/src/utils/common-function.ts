export const getBaseApiURL = (): string => {
    if (import.meta.env.NODE_ENV === "development") {
        return `${import.meta.env.VITE_API_URL}`;
    }

    return `/api`;
}