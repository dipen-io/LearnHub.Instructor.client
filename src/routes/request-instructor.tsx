import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import InstructorRequestForm from "@/components/InstructorRequestForm";

export const Route = createFileRoute("/request-instructor")({
    component: RouteComponent,
});

function RouteComponent() {
    const [showForm, setShowForm] = useState(false);

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