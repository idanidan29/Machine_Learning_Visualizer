"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | unknown;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLElement | null>(null);
  
  // Safety check for content
  if (!content || content.length === 0) {
    return <div className="text-white text-center p-8">No content available</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const linearGradients = [
    "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(79, 70, 229, 0.1))", // purple to indigo
    "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(147, 51, 234, 0.1))", // pink to purple
    "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))", // blue to purple
    "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))", // emerald to blue
    "linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.1))", // amber to emerald
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  // Safety check for activeCard bounds
  const safeActiveCard = Math.min(Math.max(0, activeCard), content.length - 1);
  const currentContent = content[safeActiveCard];

  return (
    <motion.div
      className="relative flex h-full justify-center space-x-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: safeActiveCard === index ? 1 : 0.3,
                }}
                className="text-3xl font-bold text-white"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: safeActiveCard === index ? 1 : 0.3,
                }}
                className="text-lg mt-6 max-w-lg text-gray-300 leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-0 hidden h-88 w-[28rem] overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm lg:block",
          contentClassName,
        )}
      >
        {currentContent && typeof currentContent.content !== "undefined" ? currentContent.content as React.ReactNode : null}
      </div>
    </motion.div>
  );
};
