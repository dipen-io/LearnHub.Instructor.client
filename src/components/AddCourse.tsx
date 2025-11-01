import { useState, useEffect, useRef } from "react";
import { getCategory } from "@/services/categoryServive";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FilePreview from "reactjs-file-preview";

interface AddCourseProps {
  onClose: () => void;
}

export default function AddCourse({ onClose }: AddCourseProps) {
  const [form, setForm] = useState({
    courseTitle: "",
        price: "",
        isFree:"",
        level: "",
        language: "",
        duration: "",
        discount: "",
        category: "",
        tags: [],
        requirements : "",
        description: "",
        whatYouWillLearn :"",
    courseThumbnail: null,
    promoVideoUrl : null,
    enrollmentDeadline:"",
    publishedAt: "",
  });

  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Debounce user typing to reduce API calls
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(handler);
  }, [query]);

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

  const handleCategorySelect = (categoryName: string) => {
    setForm((prev) => ({ ...prev, category: categoryName }));
    setQuery(categoryName);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.courseTitle || !form.description) {
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
    <div className=" w-screen max-w-4xl mx-auto mt-6 md:mt-0 shadow-lg rounded-lg p-6 transition-all
            duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300
             dark:border-gray-600 pb-3 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
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
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Course Title *
          </label>
          <input
            type="text"
            name="courseTitle"
            value={form.courseTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none
                  focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-black  dark:text-white"
            placeholder="Enter course title"
          />
        </div>

         {/* price & isFree */}
         <div className="flex md:gap-10 gap-5 flex-wrap">
            <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Price *
            </label>
            <input type="number" placeholder="999.00"
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={form.price}
            name="price"
            onChange={handleChange}  />
            </div>
              {/* FREE/PAID */}
            <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">
                Free/Paid *
            </label>
                <select className="w-full text-gray-500 px-10 py-2 border rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700
                     dark:border-gray-600 dark:text-white border-gray-400"
                      name="isFree"
                      value={form.isFree}
                      onChange={handleChange}
                        >
                     <option value="">Select Price</option>
                     <option value="free">Free</option>
                     <option value="paid">Paid</option>
                </select>
            </div>
              {/* LEVEL */}
             <div>
               <label className="block text-gray-700 dark:text-gray-200 mb-1">
                    Level *
               </label>
                <select className="w-full text-gray-500 px-10 py-2 border border-gray-400 rounded-md
                    focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700
                    dark:border-gray-600 dark:text-white" >
                     <option value="Beginner">Beginner</option>
                     <option value="Intermediate">Intermediate</option>
                     <option value="Advanced">Advanced</option>
                </select>
             </div>
        </div>

        {/* Duration Language Discout*/}
          <div className="flex md:gap-10 gap-5 flex-wrap">
                <div>
                    {/* Language */}
                   <label className="block text-gray-700 dark:text-gray-200 mb-1">  Language * </label>
                   <select className="w-full text-gray-500 px-10 py-2 border rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700
                      dark:border-gray-600 dark:text-white border-gray-400" name="SELECT" >
                     <option value="Bodo">Bodo</option>
                     <option value="English">English</option>
                     <option value="Hindi">Hindi</option>
                   </select>
                </div>
                <div>
                    {/* Duration */}
                   <label className="block text-gray-700 dark:text-gray-200 mb-1">  Duration </label>
                   <select className="w-full text-gray-500 px-10 py-2 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700
                         dark:border-gray-600 dark:text-white border-gray-400" name="SELECT" >
                     <option value="Bodo">Hours</option>
                     <option value="Bodo">Week</option>
                     <option value="English">Mount</option>
                     <option value="Hindi">Year</option>
                   </select>
                </div>
               {/* Discount */}
              <div className="flex flex-col">
                <label className="block text-gray-700  mb-1"> Discout(%)  </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={form.discount}
                  onChange={handleChange}
                  placeholder="Enter discount percentage"
            className="w-full px-2 py-2 border border-gray-400 rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave 0 if no discount applies.
                </p>
              </div>
          </div>

        {/* ✅ Category Dropdown */}
        <div className="relative">
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
             focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-400"
            placeholder="Type to search category..."
          />
          {showDropdown && categories?.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300
               dark:border-gray-600 rounded-md w-full mt-1 max-h-48 overflow-auto shadow-md">
              {categories?.slice(0, 5).map((cat: any) => (
                <li
                  key={cat.id}
                  onMouseDown={() => handleCategorySelect(cat.name)}
                  className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-gray-600
                         cursor-pointer text-gray-800 dark:text-white"
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

         {/* TAGS */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Tags *
          </label>
           {form.tags}
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 border-gray-400 border rounded-md focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter course tags"
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Requirements
          </label>
          <input
            type="text"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md border-gray-400 focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter course requirements"
          />
        </div>

        { /* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none
                focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600
                dark:text-white border-gray-400"
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
                focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600
                dark:text-white border-gray-400"
            placeholder="what you will learn in this course ?"
          ></textarea>
        </div>
{/***************************************************************************************************/}
{/* --- UPLOAD SECTION: THUMBNAIL & PROMO VIDEO --- */}
{/* --- UPLOAD SECTION: THUMBNAIL & PROMO VIDEO --- */}
<div className="flex flex-col md:flex-row gap-8">

  {/* --- 1. THUMBNAIL UPLOADER --- */}
  <div className="w-full md:w-1/2">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Upload Thumbnail Image
    </label>

    {/* Styled upload button */}
    <label
      htmlFor="thumbnail-upload"
      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    >
      {/* NEW: Show filename if it exists, otherwise show default text.
        'truncate' prevents super long filenames from breaking the layout.
      */}
      <span className="truncate max-w-xs">
        {form.courseThumbnail
          ? form.courseThumbnail.name
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
    <div className="relative mt-4 w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
      {form.courseThumbnail ? (
        <>
          <FilePreview
            preview={URL.createObjectURL(form.courseThumbnail)}
          />
          {/* NEW: "X" Button to remove the file */}
          <button
            type="button" // Prevents form submission
            onClick={() => handleRemoveFile('courseThumbnail', thumbnailInputRef)}
            className="absolute top-2 right-2 z-10 p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      Upload Promo Video
    </label>

    <label
      htmlFor="video-upload"
      className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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

    <div className="relative mt-4 w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner flex items-center justify-center overflow-hidden">
      {form.promoVideoUrl ? (
        <>
          <FilePreview
            preview={URL.createObjectURL(form.promoVideoUrl)}
          />
          {/* NEW: "X" Button to remove the file */}
          <button
            type="button"
            onClick={() => handleRemoveFile('promoVideoUrl', videoInputRef)}
            className="absolute top-2 right-2 z-10 p-1 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
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

