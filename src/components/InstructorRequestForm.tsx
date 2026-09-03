
// components/InstructorRequestForm.tsx

import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface InstructorRequestFormProps {
    onClose: () => void;
}

export default function InstructorRequestForm({
    onClose,
}: InstructorRequestFormProps) {
    const [formData, setFormData] = useState({
        expertise: "",
        bio: "",
        experience: "",
        reason: "",
        portfolioUrl: "",
        linkedinUrl: "",
    });

    const { theme } = useTheme();

    const isDark = theme === "dark";

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

        // API call here
    };

    const inputClass = `
        w-full rounded-xl border px-4 py-3 text-sm
        outline-none transition-all duration-200
        placeholder:text-gray-400
        focus:ring-2 focus:ring-cyan-500/20
        ${isDark
            ? "border-gray-700 bg-gray-900 text-white focus:border-cyan-500"
            : "border-gray-200 bg-gray-50 text-gray-900 focus:border-cyan-500"
        }
    `;

    const labelClass = `
        mb-2 block text-sm font-semibold
        ${isDark ? "text-gray-200" : "text-gray-700"}
    `;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div
                className={`
                    relative flex max-h-[92vh] w-full max-w-4xl
                    flex-col overflow-hidden rounded-2xl shadow-2xl
                    ${isDark
                        ? "bg-gray-950 text-white"
                        : "bg-white text-gray-900"
                    }
                `}
            >
                {/* Header */}
                <div
                    className={`
                        flex items-center justify-between border-b px-6 py-5
                        sm:px-8
                        ${isDark
                            ? "border-gray-800"
                            : "border-gray-100"
                        }
                    `}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">
                            <svg
                                className="h-6 w-6 text-cyan-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 14l9-5-9-5-9 5 9 5z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12v4.5c0 1.5 3.134 3.5 7 3.5s7-2 7-3.5V12"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl">
                                Become an Instructor
                            </h2>

                            <p
                                className={`mt-1 text-sm ${isDark
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                    }`}
                            >
                                Share your knowledge and teach others.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className={`
                            flex h-9 w-9 items-center justify-center
                            rounded-lg text-xl transition
                            ${isDark
                                ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            }
                        `}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto px-6 py-6 sm:px-8">
                    {/* Intro */}
                    <div
                        className={`
                            mb-7 rounded-xl border p-4
                            ${isDark
                                ? "border-cyan-900/50 bg-cyan-950/20"
                                : "border-cyan-100 bg-cyan-50"
                            }
                        `}
                    >
                        <p
                            className={`text-sm leading-6 ${isDark
                                    ? "text-cyan-100"
                                    : "text-cyan-900"
                                }`}
                        >
                            Tell us about your skills and experience. Our team
                            will review your application and get back to you.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                        {/* Section: About You */}
                        <div>
                            <div className="mb-5">
                                <h3 className="text-base font-bold">
                                    About You
                                </h3>
                                <p
                                    className={`mt-1 text-xs ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                        }`}
                                >
                                    Tell us about your teaching expertise.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Expertise */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="expertise"
                                        className={labelClass}
                                    >
                                        What do you want to teach?
                                    </label>

                                    <input
                                        id="expertise"
                                        type="text"
                                        name="expertise"
                                        value={formData.expertise}
                                        onChange={handleChange}
                                        placeholder="e.g. Web Development, Mathematics"
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                {/* Bio */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="bio"
                                        className={labelClass}
                                    >
                                        Tell us about yourself
                                    </label>

                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Introduce yourself, your background and your area of expertise..."
                                        required
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                {/* Experience */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="experience"
                                        className={labelClass}
                                    >
                                        Teaching / Professional Experience
                                    </label>

                                    <textarea
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Describe your professional or teaching experience..."
                                        required
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section: Motivation */}
                        <div>
                            <div className="mb-5">
                                <h3 className="text-base font-bold">
                                    Your Motivation
                                </h3>

                                <p
                                    className={`mt-1 text-xs ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                        }`}
                                >
                                    Help us understand why you want to teach.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="reason"
                                    className={labelClass}
                                >
                                    Why do you want to become an instructor?
                                </label>

                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell us what motivates you to share your knowledge..."
                                    required
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </div>

                        {/* Section: Links */}
                        <div>
                            <div className="mb-5">
                                <h3 className="text-base font-bold">
                                    Your Links
                                </h3>

                                <p
                                    className={`mt-1 text-xs ${isDark
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                        }`}
                                >
                                    Optional, but they can help us review your
                                    profile.
                                </p>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                {/* Portfolio */}
                                <div>
                                    <label
                                        htmlFor="portfolioUrl"
                                        className={labelClass}
                                    >
                                        Portfolio / Website
                                        <span className="ml-2 font-normal text-gray-400">
                                            Optional
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            🌐
                                        </span>

                                        <input
                                            id="portfolioUrl"
                                            type="url"
                                            name="portfolioUrl"
                                            value={formData.portfolioUrl}
                                            onChange={handleChange}
                                            placeholder="https://example.com"
                                            className={`${inputClass} pl-11`}
                                        />
                                    </div>
                                </div>

                                {/* LinkedIn */}
                                <div>
                                    <label
                                        htmlFor="linkedinUrl"
                                        className={labelClass}
                                    >
                                        LinkedIn
                                        <span className="ml-2 font-normal text-gray-400">
                                            Optional
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            in
                                        </span>

                                        <input
                                            id="linkedinUrl"
                                            type="url"
                                            name="linkedinUrl"
                                            value={formData.linkedinUrl}
                                            onChange={handleChange}
                                            placeholder="https://linkedin.com/in/..."
                                            className={`${inputClass} pl-11`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div
                            className={`
                                flex flex-col-reverse gap-3 border-t pt-6
                                sm:flex-row sm:justify-end
                                ${isDark
                                    ? "border-gray-800"
                                    : "border-gray-100"
                                }
                            `}
                        >
                            <button
                                type="button"
                                onClick={onClose}
                                className={`
                                    rounded-xl border px-6 py-3 text-sm
                                    font-semibold transition
                                    ${isDark
                                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }
                                `}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="
                                    rounded-xl bg-cyan-600 px-6 py-3
                                    text-sm font-semibold text-white
                                    shadow-sm transition
                                    hover:bg-cyan-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-cyan-500
                                    focus:ring-offset-2
                                "
                            >
                                Submit Application
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

