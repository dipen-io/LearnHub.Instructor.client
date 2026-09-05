import clsx from 'clsx';
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/contexts/ThemeContext";
import img from "../../../public/js.png"

interface CourseDetails {
  id: string;
  thumbnail: string;
  price: number;
  title: string;
  discount?: number | null;
  tags?: string[];
  instructorName?: string;
}

const CourseCard = ({
  id,
  thumbnail,
  price,
  title,
  discount,
  tags,
  instructorName,
}: CourseDetails) => {
  const { theme } = useTheme();
  const [isHover, setIsHover] = useState(false);

  const handleAdd = (courseId: string) => {
    console.log("ADDED ID", courseId);
  };

  const handleDelete = (courseId: string) => {
    console.log("DELETED ID", courseId);
  };

  const hasDiscount = discount != null && discount > 0 && discount < price;
  const finalPrice = hasDiscount ? price - discount! : price;
  const isFree = finalPrice === 0;

  return (
    <div
      className={clsx(
        "group bg-slate-200 rounded-lg overflow-hidden mt-5",
        "transition-all duration-300 cursor-pointer",
        theme !== "white" && "hover:bg-gray-950",
        {
          'hover:shadow-lg hover:shadow-gray-400': theme === 'white',
          'hover:shadow-lg dark:hover:shadow-white/10': theme !== 'white',
        }
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative">
        <Link to={`/course/${id}`} search={{ title }}>
          <img
            src={img}
            alt={title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-course.png";
            }}
          />
          {isHover && (
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-60 z-50 text-white">
              <div className="flex gap-3">
                <Plus
                  size={50}
                  className="border hover:border-2 bg-blue-500 rounded-md hover:bg-green-700"
                  onClick={(e) => {
                    e.preventDefault(); // stop Link navigation
                    handleAdd(id);
                  }}
                />
                <Trash2
                  size={50}
                  className="border hover:border-2 bg-green-500 rounded-md hover:bg-red-600"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(id);
                  }}
                />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
        </Link>
      </div>

      <div className="px-2 md:px-4 pt-2">
        <p
          className={clsx(
            "font-semibold text-sm md:text-base truncate-2",
            "text-gray-800",
            theme !== "white" && "group-hover:text-white"
          )}
        >
          {title}
        </p>

        {instructorName && (
          <p className={clsx("text-xs text-gray-500", theme !== "white" && "group-hover:text-gray-300")}>
            {instructorName}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-300 text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="md:p-4 flex justify-between items-center py-2 px-2 md:px-0">
        <div className="flex items-center gap-2">
          {isFree ? (
            <span className="font-bold text-green-600 md:text-base text-sm">Free</span>
          ) : (
            <>
              <span
                className={clsx(
                  "font-bold text-green-600 md:text-base text-sm",
                  theme !== "white" && "group-hover:text-green-400"
                )}
              >
                ${finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                  ${price.toFixed(2)}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;