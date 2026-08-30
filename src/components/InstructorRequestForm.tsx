// components/InstructorRequestForm.tsx

import { useState } from "react";

interface InstructorRequestFormProps {
    onClose: () => void;
}

export default function InstructorRequestForm({
    onClose,
}: InstructorRequestFormProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        expertise: "",
        bio: "",
        experience: "",
        reason: "",
        portfolioUrl: "",
        linkedinUrl: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);

        // Later:
        // API call to create instructor request
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-cyan-950">
                            Become an Instructor
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Tell us a little about yourself.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-black"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* Expertise */}
                    <div>
                        <label className="mb-1 block font-medium">
                            What do you want to teach?
                        </label>

                        <input
                            type="text"
                            name="expertise"
                            value={formData.expertise}
                            onChange={handleChange}
                            placeholder="e.g. Web Development, Mathematics"
                            required
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Tell us about yourself
                        </label>

                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Introduce yourself and your expertise..."
                            required
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Teaching / Professional Experience
                        </label>

                        <textarea
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Tell us about your experience..."
                            required
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Why do you want to become an instructor?
                        </label>

                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Tell us why you want to teach..."
                            required
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* Portfolio */}
                    <div>
                        <label className="mb-1 block font-medium">
                            Portfolio / Website
                            <span className="ml-1 text-sm text-gray-400">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="url"
                            name="portfolioUrl"
                            value={formData.portfolioUrl}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="mb-1 block font-medium">
                            LinkedIn
                            <span className="ml-1 text-sm text-gray-400">
                                (Optional)
                            </span>
                        </label>

                        <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-cyan-700"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2 font-medium hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-cyan-900 px-5 py-2 font-medium text-white hover:bg-cyan-800"
                        >
                            Submit Application
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}