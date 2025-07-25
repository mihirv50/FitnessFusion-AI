import { useEffect, useState } from "react"
import { Card, CardContent } from "../Components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../Components/ui/Carousel"

const Features = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const featureList = [
    {
      title: "Personalized Workouts",
      description: "AI builds custom routines based on your body, schedule, and goals—whether you're at home or in the gym.",
    },
    {
      title: "Smart Meal Planning",
      description: "Get meal suggestions with macros tailored to your fitness goals and dietary preferences.",
    },
    {
      title: "Weekly Progress Insights",
      description: "AI analyzes your weekly activity and gives smart feedback to keep you on track.",
    },
    {
      title: "Motivational Boosts",
      description: "Stay consistent with daily AI-curated tips, affirmations, and mini-challenges.",
    },
  ]

  return (
    <div className="w-full min-h-screen p-6 text-white flex flex-col items-center justify-center gap-30">
      <h1 className="text-5xl sm:text-6xl font-bold text-center">
        Built for Your Body. <br /> Powered by AI.
      </h1>

      <div className="w-full sm:w-[60vw]">
        <Carousel setApi={setApi} className="w-full max-w-2xl mx-auto">
          <CarouselContent>
            {featureList.map((feature, index) => (
              <CarouselItem key={index}>
                <Card className="bg-gray-800 text-white shadow-lg rounded-2xl">
                  <CardContent className="flex flex-col gap-4 p-8 items-center justify-center h-full">
                    <h2 className="text-2xl font-semibold mb-5">{`${feature.title}`}</h2>
                    <p className="text-sm sm:text-base text-zinc-300">{feature.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Features
