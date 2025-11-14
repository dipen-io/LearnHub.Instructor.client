import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/services/courseService";

interface Course {
    id: number;
    courseTitle: string;
    //...
}

export const useCourses = () => {
    return useQuery({
        // 1. Query Key: Unique key for caching and invalidation
        // Use an array, often with the endpoint/resource name.
        queryKey: ['courses'],

        // 2. Query Function: The asynchronous function that fetches the data
        queryFn: getCourses,

        // 3. Optional: Configure caching/stale time if needed
        // staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes

        // 4. Select/Transform data (optional)
        // select: (data) => data.map(course => ({...course, modified: true}))
    })
}
