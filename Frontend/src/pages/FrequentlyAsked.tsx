import { useState } from "react";

interface FAQI {
  id: number;
  ques: string;
  answer: string;
}

const FrequentlyAsked = () => {
  const [faq] = useState<FAQI[]>([
    {
      id: 1,
      ques: "Is this app free?",
      answer:
        "You can generate your first AI plan for free. Premium features like weekly feedback and advanced tracking are coming soon.",
    },
    {
      id: 2,
      ques: "Do I need gym equipment?",
      answer: "Nope! You can choose bodyweight-only during onboarding.",
    },
    {
      id: 3,
      ques: "Is it beginner friendly?",
      answer: "Absolutely. We build routines based on your fitness level.",
    },
  ]);
  return (
    <>
      <div className="w-screen h-screen text-[#E7EFE6] flex items-center flex-col gap-10">
        <h1 className="text-2xl font-bold">FAQ</h1>
        {faq.map((f) => (
          <div className="bg-[#3c3c3c] rounded-lg w-[50vw] h-[13vh] p-4">
            <h3 className="text-xl font-semibold">Q. {f.ques}</h3>
            <p className="text-lg font-light">{f.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FrequentlyAsked;
