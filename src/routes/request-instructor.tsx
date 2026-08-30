import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute('/request-instructor')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <div className="mx-10">

                <div className="">
                    <h1 className="font-bold text-cyan-950 text-2xl"> Become an instructors </h1>
                    <p className="my-2"> Share your knowledge and help students learn new skills. </p>
                    <p>As an instructor, you will be able to create and publish courses, manage your students,
                    </p>
                    and share your expertise on our platform.
                    <p>
                    </p>

                </div>

                <div className="">
                    <p className="my-2 font-bold text-cyan-900 text-2xl">How it works</p>
                    <ol className="mx-6 list-decimal list-inside">
                        <li className="">Submit your instructor application.</li>
                        <li>Our admin team reviews your application.</li>
                        <li>Once approved, your account will be upgraded to an instructor account.</li>
                        <li>Start creating and publishing your courses.</li>
                    </ol>
                </div>
                <div>
                    <p className="my-2 font-bold text-cyan-900 text-2xl">Ready to teach?</p>
                    <p>Tell us a little about yourself and your teaching experience.</p>

                </div>
                <button className=" rounded font-bold hover:underline p-2"> Apply to Become an Instructor</button>
            </div>

        </>
    )
}