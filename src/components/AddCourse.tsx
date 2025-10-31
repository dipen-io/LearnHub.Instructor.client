import { useState, useEffect } from "react";
import { getCategory } from "@/services/categoryServive";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddCourseProps {
  onClose: () => void;
}

export default function AddCourse({ onClose }: AddCourseProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
  });

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // ✅ Debounce user typing to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  // ✅ Fetch categories from backend based on query
  const {
    data: categories,
    isLoading: isCategoryLoading,
    error: _categoryError,
  } = useQuery({
    queryKey: ["categories", debouncedQuery],
    queryFn: () => getCategory({search: debouncedQuery, limit: 5}),
    enabled: !!debouncedQuery, // only fetch when user types
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      setQuery(value);
      setShowDropdown(true);
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setForm((prev) => ({ ...prev, category: categoryName }));
    setQuery(categoryName);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      toast.success("Course added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add course");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen max-w-4xl mx-auto mt-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Add New Course
        </h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Course Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Write a short course description"
          ></textarea>
        </div>

        {/* ✅ Category Dropdown */}
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Type to search category..."
          />
          {showDropdown && categories?.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md w-full mt-1 max-h-48 overflow-auto shadow-md">
              {categories.slice(0, 5).map((cat: any) => (
                <li
                  key={cat.id}
                  onMouseDown={() => handleCategorySelect(cat.name)}
                  className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-white"
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
          {isCategoryLoading && (
            <p className="text-sm text-gray-500 mt-1">Loading categories...</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Paste image URL"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

