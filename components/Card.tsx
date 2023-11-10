import Image from "next/image"

interface CardInterface {
  text: string
  image_url: string
}

export default function Card({ text, image_url }: CardInterface) {
  return (
    <div className="relative group cursor-pointer h-48 sm:h-64 lg:h-72 aspect-[3/4]">
      <div
        style={{ transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4] w-full h-full transition-all duration-500 rotate-y-0 group-hover:rotate-y-180"
      >
        <div className="flip-card absolute top-0 left-0 w-full h-full overflow-hidden">
          <Image
            src={image_url}
            fill
            sizes="auto"
            className="bg-cover object-cover"
            alt="card"
          />
        </div>
        <div className="flip-card absolute top-0 left-0 h-full w-full overflow-hidden flex items-center justify-center rotate-y-180">
          <Image
            src={image_url}
            fill
            sizes="auto"
            className="bg-cover object-cover"
            alt="card"
          />
          <div className="text-xs absolute w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
            {text}
          </div>
        </div>
      </div>
    </div>
  )
}
