

export default function PendingInstructorRequest() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border border-cyan-100 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50">
                    <svg
                        className="h-8 w-8 text-cyan-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-cyan-950">
                    Application Under Review
                </h1>

                <p className="mt-3 leading-6 text-gray-500">
                    Your instructor application has already been submitted.
                    Our admin team is currently reviewing your application.
                </p>

                <div className="mt-6 rounded-xl bg-cyan-50 p-4">
                    <p className="text-sm font-semibold text-cyan-900">
                        Status
                    </p>

                    <p className="mt-1 text-sm text-cyan-700">
                        Pending Review
                    </p>
                </div>

                <p className="mt-5 text-sm text-gray-400">
                    You will be able to become an instructor once your
                    application is approved.
                </p>
            </div>
        </div>
    );
}

