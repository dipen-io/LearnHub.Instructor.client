import { axiosInstance } from "@/lib/axios";

interface CourseFormData {
    courseTitle: string;
    price: string;
    isFree: string;
    level: string;
    language: string;
    duration: string;
    discount: string;
    category: string;
    tags: string;
    requirements: string;
    description: string;
    whatYouWillLearn: string;
    courseThumbnail: File | null;
    promoVideoUrl: File | null;
}

// GET ALL COURSES :
export const getCourses = async () => {
    const { data } = await axiosInstance.get("/course");
    console.log("api/v1/course", data);
    return data;
}

// GET SINGLE SINGLE:
export const getSingleCourseById = async (videoId: number) => {
    const { data } = await axiosInstance.get(`/videos/${videoId}`);
    return data;
}

// Create Courses:
export const createCourse = async (courseData: CourseFormData, instructorId: number) => {
    const formData = new FormData();
    Object.entries(courseData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
            formData.append(key, value);
        }
    });

    for (const [key, value] of formData.entries()) {
        console.log("FormData entry:", key, value);
    }
    const url = `/course/new?instructorId=${encodeURIComponent(instructorId)}`;
    // const { data } = await axiosInstance.post(`/course/new` ,formData);
    const { data } = await axiosInstance.post(url, formData);
    console.log("what is not found", data);
    return data;
}

// DELETE  Videos:
// ARCHIVE Videos:
// UPLOAD  COURSE VIDEOS:
