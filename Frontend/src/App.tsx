import Features from "./pages/Features"
import Landing from "./pages/Landing"
import Working from "./pages/Working"

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#0B2545] overflow-x-hidden">
      <Landing/>
      <Features/>
      <Working/>
    </div>
  )
}

export default App