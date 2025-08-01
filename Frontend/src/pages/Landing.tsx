import Nav from "../Components/Nav"
import { Button } from "../Components/ui/Button"

const Landing = () => {
  return (
    <div className="w-full h-full">
        <Nav/>
        <div className="w-[20vw] sm:w-full mx-[200px] sm:mx-auto h-[50vh] mt-14 flex items-center justify-center gap-60 text-[#E7EFE6]">
            <div className="leftSide">
                <h1 className="text-3xl sm:text-6xl text-center font-bold">Your Personal AI Fitness Coach,<br /> Anytime, Anywhere</h1>
                <p className="text-center font-light text-sm sm:text-2xl mt-8">Get personalized workout routines, meal plans,<br /> and weekly motivation—tailored just for you by AI. <br /> No gym? No problem. No trainer? We've got you covered.</p>
            </div>

        </div>
        <div className="text-center mt-4 text-[#E7EFE6]">
          <Button className="py-6 px-12 bg-[#182838] hover:bg-[#3c3c3c]" variant="default" size="xl">Get Started Now</Button>
        </div>
    </div>
  )
}

export default Landing