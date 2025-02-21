// components/PageLayout.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, Children } from "react";

import { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {Children.map(children, (child, index) => {
        if (!child) return null;

        return <RevealWrapper key={index}>{child}</RevealWrapper>;
      })}
    </>
  );
}

const RevealWrapper = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
