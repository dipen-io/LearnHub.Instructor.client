import VideoCard from "@/components/card/VideoCard";

const videoData = [
    { id : 1, thumbnail: '/js.png', price: 549, title: 'Intro to React' },
    { id : 2, thumbnail: '/js.png', price: 259, title: 'Advanced Tailwind' },
    { id : 3, thumbnail: '/js.png', price: 779, title: 'Node.js Basics' },
    { id : 4, thumbnail: '/js.png', price: 999, title: 'Fullstack Mastery' },
    { id : 5, thumbnail: '/js.png', price: 490, title: 'Intro to Javascript' },
    { id : 6, thumbnail: '/js.png', price: 159, title: 'Advanced RUST' },
    { id : 7, thumbnail: '/js.png', price: 789, title: 'Golang Basics' },
    { id : 8, thumbnail: '/js.png', price: 199, title: 'Fullstact GenAI Mastery' },
];

export default function VideoSection() {
    return (
        <>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 gap-2">
              {videoData.map((video) => (
                 <VideoCard
                     id={video.id}
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
