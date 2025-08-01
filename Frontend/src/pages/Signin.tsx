import Input from "@/Components/Input"
import { Button } from "@/Components/ui/Button"


const Signin = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-7 items-center justify-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <div className="w-[70vw] sm:w-[20vw] h-[50vh] bg-[#1e1e1e] rounded-lg p-4">
            <form className="w-full flex flex-col items-center gap-6 text-zinc-800 mt-10">
            <Input
              className="w-full px-4 py-2 bg-zinc-300 rounded border border-zinc-200"
              placeholder="First Name"
            />
            <Input
              className="w-full px-4 py-2 bg-zinc-300 rounded border border-zinc-200"
              placeholder="Last Name"
            />
            <Input
              className="w-full px-4 py-2 bg-zinc-300 rounded border border-zinc-200"
              placeholder="Username"
            />
            <Input
              className="w-full px-4 py-2 bg-zinc-300 rounded border border-zinc-200"
              placeholder="Password"
            />
            <Button variant="default" size="lg" className="w-full bg-[#3c3c3c] sm:w-auto">
              Sign In
            </Button>
          </form>
          <p className="font-light mt-3 text-center sm:mt-5 text-white">Don't have an account?  <a className="font-bold underline cursor-pointer" href="">Sign Up</a></p>
        </div>
    </div>
  )
}

export default Signin