import apiUrls from "@/config/api-urls";
import axiosLib from "@/lib/axios-lib";
import type { HealthResponse } from "@/types/health-response";

export async function getHealth(): Promise<HealthResponse> {
    const res = await axiosLib.get(apiUrls.general.healthCheck);

    if (!res.status) {
        throw new Error(`Health check failed with status: ${res.status}`);
    }

    return res.data;
}