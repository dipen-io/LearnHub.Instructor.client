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
  const [durationValue, setDurationValue] = useState(1);
  const [durationUnit, setDurationUnit] = useState("week");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const instructorId = useAuthStore((state) => state.user?.instructorID);
  const [form, setForm] = useState({
    courseTitle: "",
        price: "",
        isFree: "" as "" | boolean,
        level: "",
        language: "",
        duration: "1 week",
        discount: "0",
        categoryId: null as number | null,
        tags: [] as string[],
        requirements : "",
        description: "",
        whatYouWillLearn :"",
    courseThumbnail: null as File | null,
    promoVideoUrl : null as File  | null,
    enrollmentDeadline:"",
    publishedAt: "",
  });

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  // Debounce user typing to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Mutation Hook
    const { mutate: createCourseMutation, isPending } = useMutation({
        mutationFn: ({ courseData, instructorId }) => createCourse(courseData, instructorId),
        onSuccess: (data) => {
            toast.success("Course Created Successfully");
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            onClose();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to Create Course" );
        }
    });

  // Fetch categories from backend based on query
  const {
    data: categories,
    isLoading: isCategoryLoading,
    error: _categoryError,
  } = useQuery({
    queryKey: ["categories", debouncedQuery],
    queryFn: () => getCategory({search: debouncedQuery, limit: 5}),
    enabled: !!debouncedQuery, // only fetch when user types
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (name === "category") {
    // ONLY update the display state and the search query state
    setQuery(value);
    setSelectedCategoryName(value);
    setShowDropdown(true);

    // Crucially, clear the ID if the user starts typing again
    setForm(prev => ({ ...prev, categoryId: null }));
  } else {
    // For ALL OTHER fields (courseTitle, price, level, etc.), update the form state
    setForm((prev) => ({ ...prev, [name]: value }));
  }
};

// 2. Create a new handler for files
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, files } = e.target;
  if (files && files.length > 0) {
    setForm((prev) => ({ ...prev, [name]: files[0] }));
  } else {
    setForm((prev) => ({ ...prev, [name]: null }));
  }
};

 const handleRemoveFile = (
    fieldName: "courseThumbnail" | "promoVideoUrl",
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    // Set the specific form field back to null
    setForm((prev) => ({ ...prev, [fieldName]: null }));

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

const handleCategorySelect = (category: { id: number; name: string }) => {
    // 1. Set the input display value
    setSelectedCategoryName(category.name);
    // 2. Set the form submission value (ID)
    setForm(prevForm => ({
        ...prevForm,
        categoryId: category.id,
    }));

    // 3. Close the dropdown
    setShowDropdown(false);
};

const handleDurationChange = (value: number, unit: string) => {
  const validatedValue = Math.max(0, value);

  setDurationValue(validatedValue);
  setDurationUnit(unit);
  setForm((prev) => ({
    ...prev,
    // Simplifed string format
    duration: `${validatedValue} ${unit}`,
  }));
}

const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if ((e.key === "Enter" || e.key === " ") && tagInput.trim() !== "") {
    e.preventDefault();

    const newTag = tagInput.trim();

    if (!form.tags.includes(newTag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
    }

    setTagInput("");
  }
};

  const handleRemoveTag = (tagToRemove: string) => {
      setForm((prev) => ({
          ...prev,
          tags: prev.tags.filter((tag) => tag !=  tagToRemove)
      }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.courseTitle || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!instructorId) {
          toast.error("Authentication error: Instructor ID not found.");
          return;
     }
    createCourseMutation({ courseData: form, instructorId: instructorId });
  };

  return (
    <div className=" w-screen max-w-4xl mx-auto mt-6 md:mt-0 shadow-lg rounded-lg p-6 transition-all
            duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300
             dark:border-gray-600 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 ">
          Add New Course
        </h2>
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 transition-colors md:w-8"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
         {/* CourseTitle */}
        <div>
          <label className="block text-gray-700  mb-1">
            Course Title *
          </label>
          <input
            type="text"
            name="courseTitle"
            value={form.courseTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:border-black  "
            placeholder="Enter course title"
          />
        </div>

         {/* price & isFree */}
         <div className="flex md:gap-10 gap-5 flex-wrap">
            <div>
            <label className="block text-gray-700 mb-1">
                Free/Paid *
            </label>
                <select className="w-full px-10 py-2 border rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600
                     border-gray-400"
                      name="isFree"
                        value={
                            form.isFree === "" ? "" :
                            form.isFree === true ? "free" : "paid"
                          }
                      onChange={(e) =>
                          setForm({
                            ...form,
                            isFree: e.target.value === "free",
                          })
                        } >
                     <option value="" disabled selected>Select Price</option>
                     <option value="free">Free</option>
                     <option value="paid">Paid</option>
                </select>
            </div>
            {form?.isFree === false && (
                <div>
                    <label className="block text-gray-700  mb-1">
                        Price *
                    </label>
                    <input type="number" placeholder="999.00"
                    className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none
                        focus:ring-2 focus:ring-blue-400 dark:border-gray-600 "
                    value={form.price}
                    name="price"
                    onChange={handleChange}  />
                </div>
              )}

            {form?.isFree === false && (
              <div className="flex flex-col">
                <label className="block text-gray-700  mb-1"> Discout(%)  </label>
                <input
                  type="number"
                  min={0}
                  name="discount"
                  max={100}
                  step={1}
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="Enter discount percentage"
            className="w-full px-2 py-1.5 border border-gray-400 rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-400  dark:border-gray-600 "
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave 0 if no discount applies.
                </p>
              </div>
              )}
            {/* publishedAt Date */}
              <div className="flex flex-col">
                <label className="block text-gray-700  mb-1"> Published Date </label>
                <input
                    type="date"
                    placeholder="select date"
                    required
                    value={form.publishedAt}
                    onChange={(e) => setForm({...form, publishedAt: e.target.value})}
                    className="w-full px-2 py-1.5 border border-gray-400 rounded-md focus:outline-none
                              focus:ring-2 focus:ring-blue-400  dark:border-gray-600 "
                />
            </div>
        </div>

        {/* Duration Language Discout*/}
          <div className="flex md:gap-10 gap-5 flex-wrap">
                <div>
                    {/* Language */}
                   <label className="block text-gray-700  mb-1">  Language * </label>
                   <select className="w-full  px-10 py-2 border rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-400
                      dark:border-gray-600  border-gray-400"
                      name="language"
                      value={form.language}
                      onChange={handleChange}>
                     <option value="" disabled selected>select language</option>
                     <option value="Bodo">Bodo</option>
                     <option value="English">English</option>
                     <option value="Hindi">Hindi</option>
                   </select>
                </div>
                <div>
                    {/* Duration */}
                   <label className="block text-gray-700  mb-1">  Duration </label>
                <div className="flex border rounded-md focus:outline-none focus:ring-2
                             focus:ring-blue-400 dark:border-gray-600  border-gray-400">
                    {/* Number Input */}
                    <input
                      type="number"
                      min="0"
                      value={durationValue}
                      onChange={(e) => handleDurationChange(Number(e.target.value), durationUnit)}
                      className=" w-24 px-3 py-2 text-center "
                      placeholder="0"
                    />

                    {/* Unit Select */}
                    <select
                      value={durationUnit}
                      onChange={(e) => handleDurationChange(durationValue, e.target.value)}
                      className=" px-4 py-2 "
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="hour">Hour</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                      <option value="year">Year</option>
                    </select>
                  </div>
                </div>
               {/* Discount */}
              {/* LEVEL */}
          <div>
               <label className="block text-gray-700 mb-1">
                    Level *
               </label>
                <select className="w-full  px-10 py-2 border border-gray-400 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-600 "
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                        >
                     <option value="" disabled selected>select level</option>
                     <option value="beginner">beginner</option>
                     <option value="intermediate">Intermediate</option>
                     <option value="advanced">advanced</option>
                </select>
            </div>
          </div>

        {/* ✅ Category Dropdown */}
        <div className="relative">
          <label className="block text-gray-700  mb-1">
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={selectedCategoryName}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
             focus:ring-blue-400  dark:border-gray-600  border-gray-400"
            placeholder="Type to search category..."
          />
          {showDropdown && categories?.length > 0 && (
            <ul className="absolute z-10 bg-white  border border-gray-300
               dark:border-gray-600 rounded-md w-full mt-1 max-h-48 overflow-auto shadow-md">
              {categories?.slice(0, 5).map((cat: any) => (
                <li
                  key={cat.id}
                  onMouseDown={() => handleCategorySelect(cat)}
                  className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-600
                         cursor-pointer text-gray-800 "
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

        {/* ✅ TAGS INPUT WITH RENDERED TAGS */}
        <div>
          <label className="block text-gray-700  mb-1">
            Tags *
          </label>

            <div className="flex py-2 gap-2 px-2 flex-wrap">
            {form.tags.map((tag, index) => (
              <div
                key={index}
                className="block items-center border border-gray-400 px-2 py-1 rounded-md
                    text-base "
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2  hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>

          <div className="flex flex-wrap items-center gap-2 border border-gray-400 rounded-md px-3
                py-2 dark:border-gray-600">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-grow px-2 py-1 outline-none bg-transparent  "
              placeholder="Type tag and press Enter or Space"
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-gray-700 mb-1">
            Requirements
          </label>
          <input
            type="text"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none
                focus:ring-2 focus:ring-blue-400  dark:border-gray-600 "
            placeholder="Enter course requirements"
          />
        </div>

        { /* Description */}
        <div>
          <label className="block text-gray-700  mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:border-gray-600
                border-gray-400"
            placeholder="Write a short course description"
          ></textarea>
        </div>

        { /* What u will Learn */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            What you will learn?
          </label>
          <textarea
            name="whatYouWillLearn"
            value={form.whatYouWillLearn}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none
                focus:ring-2 focus:ring-blue-400  dark:border-gray-600
                border-gray-400"
            placeholder="what you will learn in this course ?"
          ></textarea>
        </div>
{/***************************************************************************************************/}
{/* --- UPLOAD SECTION: THUMBNAIL & PROMO VIDEO --- */}
<div className="flex flex-col md:flex-row gap-8">

  {/* --- 1. THUMBNAIL UPLOADER --- */}
  <div className="w-full md:w-1/2">
    <label className="block text-sm font-medium text-gray-700  mb-2">
      Upload Thumbnail Image
    </label>

    {/* Styled upload button */}
    <label
      htmlFor="thumbnail-upload"
      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300
           dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700
           bg-white hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      {/* NEW: Show filename if it exists, otherwise show default text.
        'truncate' prevents super long filenames from breaking the layout.
      */}
      <span className="truncate max-w-xs">
        {form.courseThumbnail
          ? form?.courseThumbnail?.name
          : "Choose Image File"}
      </span>
    </label>

    <input
      id="thumbnail-upload"
      ref={thumbnailInputRef} // NEW: Attach the ref
      type="file"
      name="courseThumbnail"
      accept="image/*"
      onChange={handleFileChange}
      className="hidden"
    />

    {/* The Preview Area */}
    <div className="relative mt-4 w-full aspect-video bg-gray-100  rounded-lg
           shadow-inner flex items-center justify-center overflow-hidden">
      {form.courseThumbnail ? (
        <>
          <FilePreview
            preview={URL.createObjectURL(form.courseThumbnail)}
          />
          {/* NEW: "X" Button to remove the file */}
          <button
            type="button" // Prevents form submission
            onClick={() => handleRemoveFile('courseThumbnail', thumbnailInputRef)}
            className="absolute top-2 right-2 z-10 p-1 bg-red-600 text-white rounded-full shadow-md
                  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Remove thumbnail"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </>
      ) : (
        <span className="text-sm text-gray-400">Image Preview</span>
      )}
    </div>
  </div>

  {/* --- 2. PROMO VIDEO UPLOADER (Updated with same logic) --- */}
  <div className="w-full md:w-1/2">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Upload Promo Video
    </label>

    <label
      htmlFor="video-upload"
      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300
           dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700
           dark:text-gray-200 bg-white  hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      <span className="truncate max-w-xs">
        {form.promoVideoUrl
          ? form.promoVideoUrl.name
          : "Choose Video File"}
      </span>
    </label>

    <input
      id="video-upload"
      ref={videoInputRef} // NEW: Attach the ref
      type="file"
      name="promoVideoUrl"
      accept="video/*"
      onChange={handleFileChange}
      className="hidden"
    />

    <div className="relative mt-4 w-full aspect-video bg-gray-100  rounded-lg
          shadow-inner flex items-center justify-center overflow-hidden">
      {form.promoVideoUrl ? (
        <>
          <FilePreview
            preview={URL.createObjectURL(form.promoVideoUrl)}
          />
          {/* NEW: "X" Button to remove the file */}
          <button
            type="button"
            onClick={() => handleRemoveFile('promoVideoUrl', videoInputRef)}
            className="absolute top-2 right-2 z-10 p-1 bg-red-600 text-white rounded-full shadow-md
                 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Remove promo video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </>
      ) : (
        <span className="text-sm text-gray-400">Video Preview</span>
      )}
    </div>
  </div>

</div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md
                 dark:hover:bg-gray-500 "
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`px-4 py-2 rounded-md text-white ${
              isPending
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isPending ? "Saving..." : "Save Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

