import Nav from "../Components/Nav"
import { Button } from "../Components/ui/Button"

const Landing = () => {
  return (
    <div className="w-full h-full">
        <Nav/>
        <div className="w-[20vw] sm:w-full mx-[200px] sm:mx-auto h-[50vh] mt-14 flex items-center justify-center gap-60">
            <div className="leftSide">
                <h1 className="text-3xl sm:text-5xl text-white font-bold">Your Personal AI Fitness Coach,<br /> Anytime, Anywhere</h1>
                <p className="text-white font-light text-sm sm:text-lg mt-8">Get personalized workout routines, meal plans,<br /> and weekly motivation—tailored just for you by AI. <br /> No gym? No problem. No trainer? We've got you covered.</p>
            </div>
            <div>
                <img className="sm:w-[20vw] sm:h-[40vh] w-32 h-32 object-cover rounded" src="https://images.unsplash.com/photo-1727432806019-99527daa45f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </div>
        </div>
        <div className="text-center mt-12 text-black">
          <Button className="py-6 px-12" variant="default" size="xl">Get Started Now</Button>
        </div>
    </div>
  )
}

export default Landing