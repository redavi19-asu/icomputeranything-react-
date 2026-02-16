import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, rootRef, delay = 0, y = 14 }) {
  const ref = useRef(null);
  const [rootEl, setRootEl] = useState(null);

  // rootRef is your horizontal scroller element (so in-view works inside it)
  useEffect(() => {
    setRootEl(rootRef?.current || null);
  }, [rootRef]);

  const isInView = useInView(ref, {
    root: rootEl || undefined,
    margin: "-10% 0px -10% 0px",
    amount: 0.35,
    once: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
