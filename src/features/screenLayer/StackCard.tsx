const baseImageData = [
  { id: 1, src: "/js.png" },
  { id: 2, src: "/js.png" },
  { id: 3, src: "/js.png" },
  { id: 4, src: "/js.png" },
  { id: 5, src: "/js.png" },
  { id: 6, src: "/js.png" },
  { id: 7, src: "/js.png" },
  { id: 8, src: "/js.png" },
];

export default function ScrollingCards() {
  return (
    <div className="py-8 bg-lime-200 rounded-md">
      <h2 className="text-3xl font-bold text-center mb-6">Uplaod Your Course Today!</h2>

      {/* First Row - Scroll Left */}
      <div className="w-full overflow-hidden">
        <div className="flex animate-scroll gap-4">
          {[...baseImageData, ...baseImageData].map((image, index) => (
            <div key={index} className="flex-none w-64">
              <img
                src={image.src}
                alt={`Scrolling image ${image.id}`}
                className="w-full h-60 rounded-lg shadow-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Scroll Right */}
      <div className="w-full overflow-hidden mt-6">
        <div className="flex animate-scroll-reverse gap-4">
          {[...baseImageData, ...baseImageData].map((image, index) => (
            <div key={index} className="flex-none w-64">
              <img
                src={image.src}
                alt={`Scrolling image ${image.id}`}
                className="w-full h-60 rounded-lg shadow-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
