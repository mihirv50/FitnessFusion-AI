import Input from "@/Components/Input";
import { Button } from "@/Components/ui/Button";

const Signup = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center px-4">
      <h1 className="text-3xl font-bold">Sign Up</h1>

      <div className="w-full max-w-5xl bg-white rounded-lg flex flex-col sm:flex-row overflow-hidden shadow-lg">
        <div className="hidden sm:block sm:w-1/2 h-64 sm:h-auto">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1609899537878-88d5ba429bdb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Signup"
          />
        </div>

        <div className="w-full sm:w-1/2 bg-[#2e3030] flex items-center justify-center p-6">
          <form className="w-full flex flex-col items-center gap-6 text-zinc-800">
            <Input
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="First Name"
            />
            <Input
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="Last Name"
            />
            <Input
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="Username"
            />
            <Input
              className="w-full px-4 py-2 bg-zinc-100 rounded border border-zinc-200"
              placeholder="Password"
            />
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              Sign Up
            </Button>
          </form>
          <p>Already have an account? <a href="">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
