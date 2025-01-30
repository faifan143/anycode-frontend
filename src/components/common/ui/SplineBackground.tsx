/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";

const ParticleEffect = () => {
  return (
    <div className="absolute -inset-8 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          // Matches navbar's orange accent color with similar opacity
          className="absolute w-2 h-2 rounded-full bg-orange-500/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
const shapes: {
  كورسات: string[];
  تخرج: string[];
  نظامي: string[];
  عقود: string[];
} = {
  كورسات: [
    "M0 0L30 0L15 30Z", // Triangle
    "M0 0H30V30H0Z", // Square
    "M15 0L30 30H0Z", // Inverted Triangle
  ],
  تخرج: [
    "M0 15C0 6.716 6.716 0 15 0C23.284 0 30 6.716 30 15C30 23.284 23.284 30 15 30C6.716 30 0 23.284 0 15Z", // Circle
    "M0 0L30 0L15 30Z", // Triangle
    "M0 0H30V30H0Z", // Square
  ],
  نظامي: [
    "M15 0L30 30H0Z", // Inverted Triangle
    "M0 15C0 6.716 6.716 0 15 0C23.284 0 30 6.716 30 15C30 23.284 23.284 30 15 30C6.716 30 0 23.284 0 15Z", // Circle
    "M0 0L30 0L15 30Z", // Triangle
  ],
  عقود: [
    "M0 0L30 0L15 30Z", // Triangle
    "M0 0H30V30H0Z", // Square
    "M15 0L30 30H0Z", // Inverted Triangle
  ],
};

const FloatingShapes = ({
  type,
}: {
  type: "كورسات" | "تخرج" | "نظامي" | "عقود";
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes[type]?.map((path, i) => (
        <motion.svg
          key={i}
          width="30"
          height="30"
          viewBox="0 0 30 30"
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            opacity: [0, 0.2, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Matches navbar's orange accent color with lower opacity */}
          <path d={path} fill="currentColor" className="text-orange-500/10" />
        </motion.svg>
      ))}
    </div>
  );
};

const SplineBackground = ({
  activeTab,
}: {
  activeTab: "كورسات" | "تخرح" | "نظامي" | "عقود";
}) => {
  const styles = {
    // Matches navbar's background with similar gradient
    gradient: "from-gray-900/90 via-gray-900/90 to-gray-900/90",
    // Matches navbar's orange accent with proper opacity
    highlightColor: "rgba(249, 115, 22, 0.05)", // orange-500 with low opacity
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed -inset-8 z-0"
    >
      {/* Base background matching navbar */}
      <div
        className={`absolute -inset-8 bg-gradient-to-br ${styles.gradient} backdrop-blur-md`}
      />

      {/* Radial overlay with matching orange */}
      <div
        className="absolute -inset-8 bg-[radial-gradient(circle_at_50%_120%,var(--highlight-color),transparent_50%)]"
        style={{ "--highlight-color": styles.highlightColor } as any}
      />

      {/* Animated elements */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ParticleEffect />
          <FloatingShapes
            type={activeTab as "كورسات" | "تخرج" | "نظامي" | "عقود"}
          />
        </motion.div>
      </AnimatePresence>

      {/* Border color matching navbar */}
      <div className="absolute -inset-8 border-b border-gray-800" />

      {/* Noise texture overlay */}
      <div className="absolute -inset-8 bg-noise opacity-[0.015]" />
    </motion.div>
  );
};

export default SplineBackground;
