import Footer from "./Components/Footer"
import Features from "./pages/Features"
import FrequentlyAsked from "./pages/FrequentlyAsked"
import Landing from "./pages/Landing"
import Working from "./pages/Working"

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#0B2545] overflow-x-hidden">
      <Landing/>
      <Features/>
      <Working/>
      <FrequentlyAsked/>
      <hr />
      <Footer/>
    </div>
  )
}

export default App