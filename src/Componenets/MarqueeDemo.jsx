import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import React from "react";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I told Eat Wise I wanted abs… it gave me broccoli and wisdom. Not mad though — I’ve dropped 3 kilos and I actually like quinoa now. Who am I?",
    img: "https://i.postimg.cc/3JRPgzcT/Image2.png",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "The AI looked at my body stats and said ‘you need help’ — then gave me the best dang diet plan I’ve ever seen. I feel seen. And slightly judged.",
    img: "https://i.postimg.cc/6Qns8R14/Image1.png",
  },
  {
    name: "John",
    username: "@john",
    body: "I asked for a vegetarian diet. Eat Wise said ‘say less’ and handed me a power-packed meal plan. Protein levels: unlocked. Mood: tofu-tastic.",
    img: "https://i.postimg.cc/DZnNmNXR/Image3.png ",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Eat Wise made me realize eating healthy doesn't mean eating sad. I got a diet plan, and a tiny nutritionist in my screen who doesn’t yell at me. Win-win.",
    img: "https://i.postimg.cc/brML0VZy/Image6.png",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "PCOS-friendly and mom-approved! Eat Wise gave me a plan that’s easy, tasty, and doesn’t involve weird green sludge. 10/10 would recommend.",
    img: "https://i.postimg.cc/NMsNQHhc/Image5.png ",
  },
  {
    name: "James",
    username: "@james",
    body: "I put in my stats and the AI said ‘say no more’. Now I’m eating better, sleeping better, and my fridge is no longer full of regrets. Thanks, Eat Wise!",
    img: "https://i.postimg.cc/J0hd5BKq/Image4.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
    </div>
  );
}
