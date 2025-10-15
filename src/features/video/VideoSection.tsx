import VideoCard from "@/components/card/VideoCard";

const videoData = [
    { thumbnail: '/js.png', price: 549, title: 'Intro to React' },
    { thumbnail: '/js.png', price: 259, title: 'Advanced Tailwind' },
    { thumbnail: '/js.png', price: 779, title: 'Node.js Basics' },
    { thumbnail: '/js.png', price: 999, title: 'Fullstack Mastery' },
    { thumbnail: '/js.png', price: 490, title: 'Intro to Javascript' },
    { thumbnail: '/js.png', price: 159, title: 'Advanced RUST' },
    { thumbnail: '/js.png', price: 789, title: 'Golang Basics' },
    { thumbnail: '/js.png', price: 199, title: 'Fullstact GenAI Mastery' },
];

export default function VideoSection() {
    return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-2">
              {videoData.map((video) => (
                 <VideoCard
                     key={video.title}
                     thumbnail={video.thumbnail}
                     price={video.price}
                     title={video.title}
                 />
              ))}
          </div>
        </>
    )
}
