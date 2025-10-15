import { useTheme } from "@/contexts/ThemeContext";
import clsx from 'clsx'; // Make sure you've run `npm install clsx`

const VideoCard = ({ thumbnail, price, title }) => {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        "group bg-slate-200 rounded-lg overflow-hidden mt-5",
        "transition-all duration-300 cursor-pointer", // Use transition-all for smoother effect
        // Conditionally apply hover background for dark mode
        theme !== "white" && "hover:bg-gray-950",
        // Your shadow logic
        {
          'hover:shadow-lg hover:shadow-gray-400': theme === 'white',
          'hover:shadow-lg dark:hover:shadow-white/10': theme !== 'white',
        }
      )}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-40"></div>
      </div>

      <div className="md:p-4 flex justify-between items-center py-2">
        <p
          className={clsx(
            "font-semibold text-sm md:text-base px-2 md:px-0 truncate-2",
            "text-gray-800", // Default text color is dark gray
            // ✅ THE FIX: In dark mode, change text to white WHEN a parent with "group" is hovered
            theme !== "white" && "group-hover:text-white"
          )}
        >
          {title}
        </p>
        <p
          className={clsx(
            "font-bold text-green-600 md:text-base text-sm px-2 md:px-0",
            // (Optional) Make the price color pop more on dark hover
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
