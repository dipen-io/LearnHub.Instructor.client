import { useInfiniteQuery } from "@tanstack/react-query";
import { getCourses } from "@/services/courseService";

interface Course {
    id: string;
    courseTitle: string;
    courseThumbnail: string;
    isActive: boolean;
    tags: string[];
    price: string;
    discount: string | null;
    description: string;
    instructor: Instructor;
}

interface UseCoursesOptions {
    limit?: string;
    sort?: string;
    search?: string;
    min_price?: string;
    max_price?: string;
    category?: string;
}

interface CourseResponse {
    data: Course[];
    pagination: { next_cursor: string | null; has_more: boolean };
    applied: unknown;
}

interface Instructor {
    instructorId: number;
    fullName: string;
    expertise: string;
    socialLinks: { website?: string; linkedin?: string };
}

export const useCourses = (filters: UseCoursesOptions = {}) => {
    return useInfiniteQuery<CourseResponse>({
        queryKey: ['courses', filters],
        queryFn: ({ pageParam }) =>
            getCourses({
                ...filters,
                cursor: pageParam ?? undefined,
            }),

        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) =>
            lastPage.pagination.has_more ? lastPage.pagination.next_cursor ?? undefined : undefined
    })
}
