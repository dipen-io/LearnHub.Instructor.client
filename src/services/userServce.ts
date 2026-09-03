import { axiosInstance } from "@/lib/axios";
import axios from "axios";

// LOGIN USER
export const LoginUser = async (userData: any) => {
    const { data } = await axiosInstance.post("auth/login", userData);
    return data;
}

// CREATE USER
export const CreateUser = async (userData: any) => {
    const { data } = await axiosInstance.post("auth/create-new-user", userData);
    return data;
}

// AUTH USER ONLY TOKEN
export const VerifyUser = async () => {
    const { data } = await axiosInstance.get("auth/me");
    return data;
}

// REQUEST INSTRUCTOR 
export const RequestInstructor = async (datas: { expertise: string; bio: string; experience: string; reason: string; socialLinks: { website: string | undefined; linkedin: string | undefined; }; }) => {
    const { data } = await axiosInstance.post("auth/instructor-request", datas);
    return data;
}

// CHECK INSTRUCTOR REQUEST
export const CheckInstructorStatus = async (id: number) => {
    const { data } = await axiosInstance.get(`users/check-instructor/${id}`);
    return data;
}