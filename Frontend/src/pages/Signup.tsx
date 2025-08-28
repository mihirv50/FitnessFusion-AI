import Input from "@/Components/Input";
import { Button } from "@/Components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Axios from "../utils/Axios"

interface SignupI {
  firstname: string,
  lastname: string,
  username: string,
  password: string
}

const Signup = () => {

  const navigate = useNavigate();
  const {register, handleSubmit} = useForm<SignupI>()

  const userSignup = async (data:SignupI) => {
    try {
      const response = await Axios.post(`/signup`,data);
      console.log(response)
      navigate("/signin")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center px-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>


        <div className="w-full sm:w-[25%] h-[50vh] shadow-lg shadow-zinc-600 rounded-md bg-[#2e3030] flex flex-col items-center justify-center p-6">
          <form onSubmit={handleSubmit(userSignup)} className="w-full flex flex-col items-center gap-6 text-zinc-800">
            <Input
              name="firstname"
              register={register}
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="First Name"
            />
            <Input
              name="lastname"
              register={register}
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="Last Name"
            />
            <Input
              name="username"
              register={register}
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="Username"
            />
            <Input
              name="password"
              register={register}
              type="password"
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="Password"
            />
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </form>
          <p className="text-zinc-100 mt-4">Already have an account? <Link to="/signin" className="underline font-bold">Sign In</Link></p>
        </div>
      </div>
  );
};

export default Signup;
