import Card from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { SquarePlay, Users, CircleDollarSign, Star } from "lucide-react";
import clsx from 'clsx';
import DashboardStats from "@/components/DashboardStats";

export default function HeroSection() {
  const { theme } = useTheme();

  // Define base styles to avoid repetition
  const cardStyles = "w-full md:w-72 h-44 rounded-2xl transition-all duration-300 ease-in-out hover:scale-105";

  return (
    <div className="mt-10 flex flex-wrap md:justify-start gap-3 md:px-0 sm:px-10 px-5 xl:gap-5 xl:px-5">
      <Card
        className={clsx(cardStyles, {
          "bg-slate-400 text-slate-800": theme === "white",
          "bg-blue-400 text-black": theme !== "white",
        })}
        data="44"
        text="Total Courses"
        Icon={SquarePlay}
      />
      <Card
        className={clsx(cardStyles, {
          "bg-slate-400 text-slate-800": theme === "white",
          "bg-blue-400 text-black": theme !== "white",
        })}
        data="1,245"
        text="Total Students"
        Icon={Users} // 2. Pass the prop as `Icon`
      />
      <Card
        className={clsx(cardStyles, {
          "bg-slate-400 text-slate-800": theme === "white",
          "bg-blue-400 text-black": theme !== "white",
        })}
        data="$1.2M"
        text="Total Earning"
        Icon={CircleDollarSign} // 3. Pass the prop as `Icon`
      />
      <Card
        className={clsx(cardStyles, {
          "bg-slate-400 text-slate-800": theme === "white",
          "bg-blue-400 text-black": theme !== "white",
        })}
        data="4.4/120"
        text=" Course Rating"
        Icon={Star}
      />
        <DashboardStats />
    </div>
  );
}
