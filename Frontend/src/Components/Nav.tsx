import { FaUserCircle } from "react-icons/fa";

const Nav = () => {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 text-white font-bold flex items-center justify-between">
        <h1 className="text-3xl">FitnessFusion AI</h1>
        <div className="text-3xl font-bold cursor-pointer">
            <FaUserCircle />
        </div>
    </div>
  )
}

export default Nav