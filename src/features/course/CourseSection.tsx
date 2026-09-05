// import toast from "react-hot-toast";
import CourseCard from "@/components/card/CourseCard";
import Loader from "@/components/Loader";
import { useCourses } from "@/hooks/useCourses";
import img from "../../../public/js.png";


export default function CourseSection() {
    const { data, isLoading, error, isSuccess, fetchNextPage, hasNextPage, isFetchNextPageError } = useCourses();

    if (isLoading) {
        return <div><Loader /></div>
    }

    if (isSuccess) {
        // toast.success(courses.message);
    }

    if (error) {
        return <div>❌ An error occurred: {error.message}</div>;
    }
    const courses = data?.pages.flatMap((page) => page.data) ?? [];

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-2">
                {courses?.map((course) => (
                    <CourseCard
                        key={course.id}
                        id={course.id}
                        thumbnail={course.courseThumbnail}
                        price={Number(course.price)}
                        discount={course.discount ? Number(course.discount) : null}
                        title={course.courseTitle}
                        tags={course.tags}
                        instructorName={course.instructor?.fullName}
                    />
                ))}
            </div>

            {hasNextPage && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={fetchNextPage}
                        className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50"
                    >
                        {fetchNextPage ? "Loading..." : "Load more"}
                    </button>
                </div>
            )}
        </>
    )
}
