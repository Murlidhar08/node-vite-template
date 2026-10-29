import type { ApiResponse } from "@/types/api-response";
import type { User } from "@/types/user";
import apiUrls from "@/config/api-urls";

export async function getHealth(): Promise<any> {
    const res = await fetch(apiUrls.general.healthCheck);

    if (!res.ok) {
        throw new Error(`Health check failed with status: ${res.status}`);
    }

    return res.json();
}

export async function getUsers(): Promise<User[]> {
    const res = await fetch(apiUrls.user.users);
    const json: ApiResponse<User[]> = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to fetch users');
    }
    return json.data || [];
}

export async function createUser(data: { email: string; name?: string }): Promise<User> {
    const res = await fetch(apiUrls.user.users, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const json: ApiResponse<User> = await res.json();
    if (!res.ok || !json.success) {
        throw new Error(json.message || 'Failed to create user');
    }
    return json.data as User;
}