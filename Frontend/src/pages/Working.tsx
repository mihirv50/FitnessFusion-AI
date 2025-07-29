import { useState } from "react";

interface workingI {
  id: number;
  title: string;
  desc: string;
}

const Working = () => {
  const [working, setWorking] = useState<workingI[]>([
    {
      id: 1,
      title: "Step 1: Tell us about yourself",
      desc: "Input your goals, body metrics, equipment access, and diet preference.",
    },
    {
      id: 2,
      title: "Step 2: Get your plan instantly",
      desc: "AI generates a 7-day workout & meal schedule based on your inputs.",
    },
    {
      id: 3,
      title: "Step 3: Track and improve",
      desc: "Log progress, regenerate plans, and receive AI feedback each week.",
    },
  ]);
  return (
    <>
      <div className="w-screen h-screen">
        <div className="flex flex-col items-center gap-20">
          <h1 className="text-5xl font-bold text-[#E7EFE6] text-center">
            How FitFusion AI Works
          </h1>
          <div className="w-[60vw] h-[60vh] bg-transparent flex flex-col gap-5 items-center p-4">
            {working.map((w) => (
              <div key={w.id} className="w-full rounded-xl h-64 text-[#E7EFE6] flex items-center flex-col justify-center gap-10 bg-[#5D86AC] p-3">
                <h1 className="font-bold text-xl">{w.title}</h1>
                <p className="font-semibold text-lg">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Working;
