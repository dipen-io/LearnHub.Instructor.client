export default function Card({ className, data, text, Icon }) {
  return (
    <div className={className}>
      {/* 2. Use flexbox for a better layout */}
      <div className="flex justify-between  items-center p-6 h-full ">
        <div className="text-left">
          <p className="text-4xl font-bold">{data}</p>
          <p className="text-lg mt-1">{text}</p>
        </div>
        {/* 3. Render the capitalized `Icon` component */}
        {Icon && <Icon className="h-12 w-12 opacity-80" />}
      </div>
    </div>
  );
}
