import Footer from "./Components/Footer"
import Features from "./pages/Features"
import FrequentlyAsked from "./pages/FrequentlyAsked"
import Landing from "./pages/Landing"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Working from "./pages/Working"

const App = () => {
  return (
    <div className="w-screen h-screen text-[#a59a94] bg-[#000000] overflow-x-hidden">
      <Landing/>
      <Features/>
      <Working/>
      <FrequentlyAsked/>
      <hr />
      <Footer/>
      {/* <Signup/> */}
      {/* <Signin/> */}
    </div>
  )
}

export default App