
import { useState, useEffect, useRef } from "react";
import { getCategory } from "@/services/categoryServive";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCourse } from "@/services/courseService";
import { useAuthStore } from "@/store/authStore";
import FilePreview from "reactjs-file-preview";

interface AddCourseProps {
  onClose: () => void;
}

export default function AddCourse({ onClose }: AddCourseProps) {
  const [tagInput, setTagInput] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const instructorId = useAuthStore(
    (state) => state.user?.instructorID
  );

  const [form, setForm] = useState({
    courseTitle: "",
    shortDescription: "",
    description: "",

    categoryId: null as number | null,

    level: "",
    language: "",

    tags: [] as string[],

    isFree: "" as "" | boolean,
    price: "",

    courseThumbnail: null as File | null,
    promoVideo: null as File | null,
  });

  // Category search
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  // --------------------------------------------------
  // Debounce category search
  // --------------------------------------------------

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // --------------------------------------------------
  // Create course mutation
  // --------------------------------------------------

  const {
    mutate: createCourseMutation,
    isPending,
  } = useMutation({
    mutationFn: ({
      courseData,
      instructorId,
    }: {
      courseData: typeof form;
      instructorId: number;
    }) => createCourse(courseData, instructorId),

    onSuccess: () => {
      toast.success("Course created successfully");

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      onClose();
    },

    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to create course"
      );
    },
  });

  // --------------------------------------------------
  // Fetch categories
  // --------------------------------------------------

  const {
    data: categories,
    isLoading: isCategoryLoading,
  } = useQuery({
    queryKey: ["categories", debouncedQuery],

    queryFn: () =>
      getCategory({
        search: debouncedQuery,
        limit: 5,
      }),

    // enabled: !!debouncedQuery,
    enabled: showDropdown
  });


  // --------------------------------------------------
  // Normal input change
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      setQuery(value);
      setSelectedCategoryName(value);
      setShowDropdown(true);

      setForm((prev) => ({
        ...prev,
        categoryId: null,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // File change
  // --------------------------------------------------

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, files } = e.target;

    if (!files || files.length === 0) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // --------------------------------------------------
  // Remove file
  // --------------------------------------------------

  const handleRemoveFile = (
    fieldName: "courseThumbnail" | "promoVideo",
    inputRef: React.RefObject<HTMLInputElement | null>
  ) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: null,
    }));

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // --------------------------------------------------
  // Select category
  // --------------------------------------------------

  const handleCategorySelect = (category: {
    id: number;
    name: string;
  }) => {
    setSelectedCategoryName(category.name);

    setForm((prev) => ({
      ...prev,
      categoryId: category.id,
    }));

    setQuery(category.name);
    setShowDropdown(false);
  };

  // --------------------------------------------------
  // Tags
  // --------------------------------------------------

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      tagInput.trim() !== ""
    ) {
      e.preventDefault();

      const newTag = tagInput.trim();

      if (!form.tags.includes(newTag)) {
        setForm((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }

      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter(
        (tag) => tag !== tagToRemove
      ),
    }));
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.courseTitle.trim() ||
      !form.shortDescription.trim() ||
      !form.description.trim()
    ) {
      toast.error(
        "Please fill in all required fields"
      );

      return;
    }

    if (!form.categoryId) {
      toast.error("Please select a category");

      return;
    }

    if (!form.level) {
      toast.error("Please select a course level");

      return;
    }

    if (!form.language) {
      toast.error("Please select a language");

      return;
    }

    if (form.isFree === "") {
      toast.error("Please select whether the course is free or paid");

      return;
    }

    if (form.isFree === false && !form.price) {
      toast.error("Please enter the course price");

      return;
    }

    if (!instructorId) {
      toast.error(
        "Authentication error: Instructor ID not found."
      );

      return;
    }

    createCourseMutation({
      courseData: form,
      instructorId,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="px-6 md:px-8 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create New Course
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add the basic information about your course.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full
              text-gray-500 hover:text-gray-900
              hover:bg-gray-100
              dark:text-gray-400 dark:hover:text-white
              dark:hover:bg-gray-800 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* =========================================
            FORM
        ========================================= */}

        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-8"
        >

          {/* =======================================
              BASIC INFORMATION
          ======================================= */}

          <section>
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Basic Information
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Tell students what your course is about.
              </p>
            </div>

            <div className="space-y-5">

              {/* Course title */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Title
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  name="courseTitle"
                  value={form.courseTitle}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Web Development"
                  className="w-full px-4 py-3 rounded-xl
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-950
                    text-gray-900 dark:text-white
                    placeholder-gray-400
                    outline-none
                    focus:ring-2 focus:ring-blue-500/20
                    focus:border-blue-500 transition"
                />

                <p className="text-xs text-gray-500 mt-1.5">
                  Choose a clear and specific title for your course.
                </p>
              </div>

              {/* Short description */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <textarea
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  rows={2}
                  maxLength={200}
                  placeholder="Briefly describe what students will learn..."
                  className="w-full px-4 py-3 rounded-xl
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-950
                    text-gray-900 dark:text-white
                    placeholder-gray-400
                    outline-none resize-none
                    focus:ring-2 focus:ring-blue-500/20
                    focus:border-blue-500 transition"
                />

                <p className="text-xs text-gray-500 mt-1.5">
                  Keep this short. It will appear on course cards.
                </p>
              </div>

              {/* Category */}

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  type="text"
                  name="category"
                  value={selectedCategoryName}
                  onChange={handleChange}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() =>
                    setTimeout(
                      () => setShowDropdown(false),
                      200
                    )
                  }
                  placeholder="Search for a category..."
                  className="w-full px-4 py-3 rounded-xl
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-950
                    text-gray-900 dark:text-white
                    placeholder-gray-400
                    outline-none
                    focus:ring-2 focus:ring-blue-500/20
                    focus:border-blue-500 transition"
                />

                {showDropdown &&
                  categories?.length > 0 && (
                    <ul
                      className="absolute z-20 mt-2 w-full
                        bg-white dark:bg-gray-900
                        border border-gray-200 dark:border-gray-700
                        rounded-xl shadow-lg overflow-hidden"
                    >
                      {categories
                        .slice(0, 5)
                        .map((cat: any) => (
                          <li
                            key={cat.id}
                            onMouseDown={() =>
                              handleCategorySelect(cat)
                            }
                            className="px-4 py-3
                              hover:bg-gray-100
                              dark:hover:bg-gray-800
                              cursor-pointer
                              text-gray-800 dark:text-gray-200"
                          >
                            {cat.name}
                          </li>
                        ))}
                    </ul>
                  )}

                {isCategoryLoading && (
                  <p className="text-xs text-gray-500 mt-2">
                    Searching categories...
                  </p>
                )}
              </div>

              {/* Level + Language */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Level
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl
                      border border-gray-300 dark:border-gray-700
                      bg-white dark:bg-gray-950
                      text-gray-900 dark:text-white
                      outline-none
                      focus:ring-2 focus:ring-blue-500/20
                      focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select level
                    </option>

                    <option value="beginner">
                      Beginner
                    </option>

                    <option value="intermediate">
                      Intermediate
                    </option>

                    <option value="advanced">
                      Advanced
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <select
                    name="language"
                    value={form.language}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl
                      border border-gray-300 dark:border-gray-700
                      bg-white dark:bg-gray-950
                      text-gray-900 dark:text-white
                      outline-none
                      focus:ring-2 focus:ring-blue-500/20
                      focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select language
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>

                    <option value="Bodo">
                      Bodo
                    </option>
                  </select>
                </div>

              </div>

              {/* Tags */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>

                <div className="min-h-[48px] flex flex-wrap items-center gap-2 px-3 py-2
                  border border-gray-300 dark:border-gray-700
                  rounded-xl
                  bg-white dark:bg-gray-950
                  focus-within:ring-2 focus-within:ring-blue-500/20
                  focus-within:border-blue-500"
                >
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1
                        px-2.5 py-1 rounded-lg
                        bg-blue-50 dark:bg-blue-950/40
                        text-blue-700 dark:text-blue-300
                        text-sm"
                    >
                      {tag}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveTag(tag)
                        }
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) =>
                      setTagInput(e.target.value)
                    }
                    onKeyDown={handleTagKeyDown}
                    placeholder={
                      form.tags.length === 0
                        ? "Add tags and press Enter"
                        : "Add another tag..."
                    }
                    className="flex-1 min-w-[150px]
                      px-1 py-1 outline-none
                      bg-transparent
                      text-gray-900 dark:text-white
                      placeholder-gray-400 text-sm"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1.5">
                  Add relevant keywords such as React, Node.js, JavaScript.
                </p>
              </div>

            </div>
          </section>

          {/* =======================================
              DESCRIPTION
          ======================================= */}

          <section>
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Course Description
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Give students a detailed overview of your course.
              </p>
            </div>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={7}
              placeholder="Write a detailed description of your course..."
              className="w-full px-4 py-3 rounded-xl
                border border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-950
                text-gray-900 dark:text-white
                placeholder-gray-400
                outline-none resize-y
                focus:ring-2 focus:ring-blue-500/20
                focus:border-blue-500 transition"
            />
          </section>

          {/* =======================================
              PRICING
          ======================================= */}

          <section>
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pricing
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Choose whether students can access this course for free or purchase it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Free / Paid */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Type
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <select
                  name="isFree"
                  value={
                    form.isFree === ""
                      ? ""
                      : form.isFree
                        ? "free"
                        : "paid"
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    setForm((prev) => ({
                      ...prev,
                      isFree:
                        value === ""
                          ? ""
                          : value === "free",
                      price:
                        value === "free"
                          ? ""
                          : prev.price,
                    }));
                  }}
                  className="w-full px-4 py-3 rounded-xl
                    border border-gray-300 dark:border-gray-700
                    bg-white dark:bg-gray-950
                    text-gray-900 dark:text-white
                    outline-none
                    focus:ring-2 focus:ring-blue-500/20
                    focus:border-blue-500"
                >
                  <option value="" disabled>
                    Select course type
                  </option>

                  <option value="free">
                    Free
                  </option>

                  <option value="paid">
                    Paid
                  </option>
                </select>
              </div>

              {/* Price */}

              {form.isFree === false && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price (₹)
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 999"
                    className="w-full px-4 py-3 rounded-xl
                      border border-gray-300 dark:border-gray-700
                      bg-white dark:bg-gray-950
                      text-gray-900 dark:text-white
                      placeholder-gray-400
                      outline-none
                      focus:ring-2 focus:ring-blue-500/20
                      focus:border-blue-500"
                  />
                </div>
              )}

            </div>
          </section>

          {/* =======================================
              MEDIA
          ======================================= */}

          <section>
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Course Media
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Add a thumbnail and an optional promotional video.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Thumbnail */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Thumbnail
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <input
                  ref={thumbnailInputRef}
                  type="file"
                  name="courseThumbnail"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="thumbnail-upload"
                />

                <label
                  htmlFor="thumbnail-upload"
                  className="block cursor-pointer"
                >
                  <div className="aspect-video rounded-xl border-2 border-dashed
                    border-gray-300 dark:border-gray-700
                    hover:border-blue-500
                    bg-gray-50 dark:bg-gray-950
                    flex items-center justify-center
                    overflow-hidden transition"
                  >
                    {form.courseThumbnail ? (
                      <FilePreview
                        preview={URL.createObjectURL(
                          form.courseThumbnail
                        )}
                      />
                    ) : (
                      <div className="text-center px-4">
                        <div className="text-3xl mb-2">
                          🖼️
                        </div>

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Click to upload thumbnail
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG or WEBP
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {form.courseThumbnail && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveFile(
                        "courseThumbnail",
                        thumbnailInputRef
                      )
                    }
                    className="mt-2 text-sm text-red-500 hover:text-red-600"
                  >
                    Remove thumbnail
                  </button>
                )}
              </div>

              {/* Promo video */}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Promo Video
                  <span className="text-gray-400 ml-1">
                    (Optional)
                  </span>
                </label>

                <input
                  ref={videoInputRef}
                  type="file"
                  name="promoVideo"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />

                <label
                  htmlFor="video-upload"
                  className="block cursor-pointer"
                >
                  <div className="aspect-video rounded-xl border-2 border-dashed
                    border-gray-300 dark:border-gray-700
                    hover:border-blue-500
                    bg-gray-50 dark:bg-gray-950
                    flex items-center justify-center
                    overflow-hidden transition"
                  >
                    {form.promoVideo ? (
                      <FilePreview
                        preview={URL.createObjectURL(
                          form.promoVideo
                        )}
                      />
                    ) : (
                      <div className="text-center px-4">
                        <div className="text-3xl mb-2">
                          🎬
                        </div>

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Click to upload promo video
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          MP4, WebM or MOV
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {form.promoVideo && (
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveFile(
                        "promoVideo",
                        videoInputRef
                      )
                    }
                    className="mt-2 text-sm text-red-500 hover:text-red-600"
                  >
                    Remove video
                  </button>
                )}
              </div>

            </div>
          </section>

          {/* =======================================
              FOOTER
          ======================================= */}

          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-5 py-2.5 rounded-xl
                border border-gray-300 dark:border-gray-700
                text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl
                bg-blue-600 hover:bg-blue-700
                disabled:bg-blue-400
                text-white font-medium
                shadow-sm transition"
            >
              {isPending
                ? "Creating..."
                : "Create Course"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

