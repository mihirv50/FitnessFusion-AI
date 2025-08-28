import Input from "@/Components/Input"
import { Button } from "@/Components/ui/Button"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import Axios from "../utils/Axios"

interface SignInI {
  username: string,
  password: string
}

const Signin = () => {
  const navigate = useNavigate()
  const {register, handleSubmit} = useForm<SignInI>();

  const userSignIn = async (data: SignInI) => {
    try {
      const response = await Axios.post(`/signin`,data)
      console.log(response)
      const jwt = response.data.token
      localStorage.setItem("token",jwt);
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-screen h-screen flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="w-[70vw] sm:w-[20vw] h-[50vh] bg-[#1e1e1e] flex items-center justify-center flex-col rounded-lg p-4 shadow-lg shadow-zinc-600">
            <form onSubmit={handleSubmit(userSignIn)} className="w-full flex flex-col items-center gap-6 text-zinc-800 mt-10">
            <Input
              name="username"
              register={register}
              className="w-full px-4 py-2 bg-zinc-300 rounded border border-zinc-200"
              placeholder="Username"
            />
            <Input
              name="password"
              register={register}
              type="password"
              className="w-full px-4 py-2 bg-zinc-300 rounded border border-zinc-200"
              placeholder="Password"
            />
            <Button variant="default" size="lg" className="w-full bg-[#3c3c3c] sm:w-auto">
              Sign In
            </Button>
          </form>
          <p className="font-light mt-3 text-center sm:mt-5 text-white">Don't have an account?  <Link to="/signup" className="font-bold underline cursor-pointer">Sign Up</Link></p>
        </div>
    </div>
  )
}

export default Signin