import Features from "./pages/Features"
import Landing from "./pages/Landing"

const App = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-black via-gray-700 to-[#6e7582] overflow-x-hidden">
      <Landing/>
      <Features/>
    </div>
  )
}

export default App