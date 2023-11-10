import Action from "@/components/Action"
import Card from "@/components/Card"
import Typing from "@/components/Typing"

export default function Home() {
  return (
    <div className="overflow-hidden bg-white">
      <div className="bg-blue-200 flex flex-col justify-between xl:grid grid-cols-2 xl:gap-16 p-4 lg:p-16 min-h-screen">
        <div className="flex flex-col justify-center xl:border-r-2 border-black p-4">
          <p className="text-8xl sm:text-9xl tracking-tighter">SATSET</p>
        </div>
        <div className="flex flex-col items-start justify-center p-4">
          <p className="text-2xl sm:text-4xl tracking-tighter">
            BLENDED IN SIGHT
          </p>
          <p className="text-2xl sm:text-4xl tracking-tighter">
            &ldquo;IT&lsquo;S JUST PLAIN IMAGE&rdquo; - THEY SAID
          </p>
          <button className="sm:text-xl tracking-tighter mt-8 underline underline-offset-1 hover:underline-offset-8 transition-all">
            SEE DOCUMENTATION
          </button>
        </div>
        <div className="col-span-2 h-min flex flex-wrap items-center justify-center sm:justify-normal gap-4 sm:gap-8 border-y-2 border-black py-4 lg:py-8 xl:py-16 px-4">
          <Card
            text="GOTCHA!"
            image_url="https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Card
            text="WHO SAID THAT?"
            image_url="https://images.unsplash.com/photo-1635404617144-8e262a622e41?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Card
            text="BETTER LUCK NEXT TIME"
            image_url="https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <Card
            text="NAH IT'S NOT"
            image_url="https://images.unsplash.com/photo-1635241161466-541f065683ba?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="flex flex-col justify-center p-4">
          <Typing />
        </div>
        <div className="flex flex-col justify-center p-4">
          <p className="max-w-md">
            SATSET is an app built for TSDN by Achmad Bauravindah and M Afifudin
            Abdullah. Scroll down to see more in action
          </p>
        </div>
      </div>
      <Action />
    </div>
  )
}
