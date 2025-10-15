import { axiosInstance } from "@/lib/axios";

// GET ALL VIDEOS:
export const getCourses = async() => {
    const { data } = await axiosInstance.get("/videos");
    return data;
}

// GET SINGLE VIDEOS:
export const getSingleCourseById = async(videoId: number) => {
    const { data } = await axiosInstance.get(`/videos/${videoId}`);
    return data;
}

// Create new Videos:
export const createCourse = async (newVideoData: object) => {
    const { data } = await axiosInstance.post(`/videos`, newVideoData);
    return data;
}

// DELETE  Videos:
// ARCHIVE Videos:
// UPLOAD  COURSE VIDEOS:
