import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import InstructorRequestForm from "@/components/InstructorRequestForm";
import { CheckInstructorStatus } from "@/services/userServce";
import { useAuthStore } from "@/store/authStore";
import PendingInstructorRequest from "@/components/PendingInstructorRequest";

export const Route = createFileRoute("/request-instructor")({
    component: RouteComponent,
});

function RouteComponent() {
    const [showForm, setShowForm] = useState(false);

    const { user } = useAuthStore();


    const [isLoading, setIsLoading] = useState(true);
    const [isPending, setIsPending] = useState(false);
    useEffect(() => {
        if (!user?.id) return;
        const checkStatus = async () => {
            try {
                setIsLoading(true);
                const data = await CheckInstructorStatus(user.id);
                if (data?.approvalStatus === "pending") {
                    setIsPending(true);
                }
                else {
                    setIsPending(false);
                }
            } catch (error) {
                console.error("Failed to check instructor status:", error);
                setIsPending(false);
            } finally { setIsLoading(false); }
        };
        checkStatus();
    }, [user?.id]);

    // Loading state 
    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-900" />
                    <p className="text-sm text-gray-500"> Checking your instructor status... </p>
                </div>
            </div>
        );
    }

    // Pending request 
    if (isPending) {
        return <PendingInstructorRequest />;
    }

    return (
        <>
            <div className="mx-10">

                <div>
                    <h1 className="text-2xl font-bold text-cyan-950">
                        Become an Instructor
                    </h1>

                    <p className="my-2">
                        Share your knowledge and help students learn new skills.
                    </p>

                    <p>
                        As an instructor, you will be able to create and publish
                        courses, manage your students, and share your expertise
                        on our platform.
                    </p>
                </div>

                <div className="mt-6">
                    <p className="my-2 text-2xl font-bold text-cyan-900">
                        How it works
                    </p>

                    <ol className="mx-6 list-inside list-decimal space-y-2">
                        <li>Submit your instructor application.</li>
                        <li>Our admin team reviews your application.</li>
                        <li>
                            Once approved, your account will be upgraded to an
                            instructor account.
                        </li>
                        <li>Start creating and publishing your courses.</li>
                    </ol>
                </div>

                <div className="mt-6">
                    <p className="my-2 text-2xl font-bold text-cyan-900">
                        Ready to teach?
                    </p>

                    <p>
                        Tell us a little about yourself and your teaching experience.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-4 rounded-lg bg-cyan-900 px-5 py-3 font-bold text-white hover:bg-cyan-800"
                    >
                        Apply to Become an Instructor
                    </button>
                </div>

            </div>

            {showForm && (
                <InstructorRequestForm
                    onClose={() => setShowForm(false)}
                />
            )}
        </>
    );
}