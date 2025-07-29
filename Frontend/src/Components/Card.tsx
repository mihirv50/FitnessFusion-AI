import { useState } from "react";

interface CardI {
  id: number;
  title: string;
  desc: string;
}

const Card = () => {
  const [cardContent, setCardContent] = useState<CardI[]>([
    {
      id: 1,
      title: "Personalized Workouts",
      desc: " AI builds custom routines based on your body, schedule, and goals—whether you're at home or in the gym.",
    },
    {
      id: 2,
      title: "Smart Meal Planning",
      desc: "Get meal suggestions with macros tailored to your fitness goals and dietary preferences.",
    },
    {
      id: 3,
      title: "Weekly Progress Insights",
      desc: "AI analyzes your weekly activity and gives smart feedback to keep you on track.",
    },
    {
      id: 4,
      title: "Motivational Boosts ",
      desc: "Stay consistent with daily AI-curated tips, affirmations, and mini-challenges.",
    },
  ]);
  return (
    <>
      {cardContent.map((c) => {
        return <div key={c.id} className="w-80 h-92 p-5 text-gray-800 bg-[#E7EFE6] rounded-xl flex flex-col items-center justify-start gap-20">
          <h1 className="text-xl font-bold">{c.title}</h1>
          <p className="text-md font-medium">{c.desc}</p>
        </div>;
      })}
    </>
  );
};

export default Card;
