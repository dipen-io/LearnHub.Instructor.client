import StaggeredCards from "./StackCard";

interface ScreenLayerProps {
    onScrollToLogin: () => void
}

export default function ScreenLayer({ onScrollToLogin }): ScreenLayerProps {
    return (
      <div className="relative snap-start h-screen text-lime-500 text-7xl justify-center items-center">
          <div className="text-center pt-50">
               <button
                onClick={onScrollToLogin}
                className="font-bold text-lime-400 px-6 py-3 shadow-md border mb-2 mx-20 rounded-lg hover:bg-slate-200"
              >
                LOGIN NOW
              </button>
               <p>LAUNCH YOUR COURSES </p>
          </div>
          <div className="text-center bg-slate-200 rounded-t-4xl h-[600px]  mt-5">
             <StaggeredCards />
          </div>
          <div className="w-full bg-lime-200 absolute bottom-0 h-16">
          </div>
      </div>
    );
}



