import { axiosInstance } from "@/lib/axios";

export interface GetCategoryParams {
    search?: string;
    limit?: number;
}
export interface Category {
    id: number;
    name: string;
}

// Get Category
export const getCategory = async (params: GetCategoryParams): Promise<Category[]> => {
    const { search = "", limit } = params;
    const query = new URLSearchParams();
    if (search) query.append("search", search);
    if (limit) query.append("limit", String(limit));
    const { data } = await axiosInstance.get(`category?${query.toString()}`);
    return data.data;
}
