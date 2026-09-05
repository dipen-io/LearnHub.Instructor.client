// import toast from "react-hot-toast";
import CourseCard from "@/components/card/CourseCard";
import Loader from "@/components/Loader";
import { useCourses } from "@/hooks/useCourses";
import img from "../../../public/js.png";


export default function CourseSection() {
    const { data: courses, isLoading, error, isSuccess } = useCourses();

    if (isLoading) {
        return <div><Loader /></div>
    }

    if (isSuccess) {
        // toast.success(courses.message);
    }

    if (error) {
        return <div>❌ An error occurred: {error.message}</div>;
    }
    console.log("Course DATA => : ", courses);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-2">
                {courses?.data?.map((course: any) => (
                    <CourseCard
                        id={course.id}
                        key={course.courseTitle}
                        thumbnail={img}
                        price={course.price}
                        title={course.courseTitle}
                    />
                ))}
            </div>
        </>
    )
}
