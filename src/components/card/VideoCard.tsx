import { useTheme } from "@/contexts/ThemeContext";
import clsx from 'clsx';
import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "@tanstack/react-router"

interface videoDetails {
    id : number,
    thumbnail: string,
    price: number,
    title: string
}

const VideoCard = ({ id, thumbnail, price, title }: videoDetails) => {
  const { theme } = useTheme();
  const [isHover, setIsHover ] = useState(false);

    const handleAdd = (id: number) => {
        console.log("ADDED ID", id);
        toast.success("Added ID", id)
    }
    const handleDelete =(id: number) => {
        console.log("DELETED ID", id);
        toast.success("Delte ID", id)
    }

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
        <Link to={`/course/${id}`}
              search={{ title }}
           >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
       {/* Overlay content */}
        {isHover && (
          <div className="absolute inset-0 flex items-center justify-center  bg-opacity-60 z-50 text-white">
            <div className="flex gap-3">
            <Plus size={50} className="border hover:border-2 bg-blue-500  rounded-md hover:bg-green-700" onClick={() => handleAdd(id)}/>
            <Trash2 size={50} className="border hover:border-2 bg-green-500 rounded-md hover:bg-red-600" onClick={() => handleDelete(id)} />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
       </Link>
      </div>

      <div className="md:p-4 flex justify-between items-center py-2">
        <p
          className={clsx(
            "font-semibold text-sm md:text-base px-2 md:px-0 truncate-2",
            "text-gray-800", // Default text color is dark gray
            theme !== "white" && "group-hover:text-white"
          )}
        >
          {title}
        </p>
        <p
          className={clsx(
            "font-bold text-green-600 md:text-base text-sm px-2 md:px-0",
            theme !== "white" && "group-hover:text-green-400"
          )}
        >
          ${price}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
