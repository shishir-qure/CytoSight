import { useEffect, useRef, useState } from "react";

const AnimatedWaveform = ({
  isRecording = false,
  height = 40, // Increased to accommodate taller bars
  animationSpeed = 5,
  className = "",
  barCounts = 3,
}) => {
  const animationRef = useRef(null);
  const frameCount = useRef(0);
  const containerRef = useRef(null);
  const [barCount, setBarCount] = useState(10);

  // Define the fixed pattern heights
  const patternHeights = [5, 8, 15, 20, 12, 5]; // Updated heights in pixels

  // Generate initial heights based on the pattern
  const generateInitialHeights = (count) => {
    const heights = [];
    for (let i = 0; i < count; i++) {
      const patternIndex = i % 7;
      heights.push(patternHeights[patternIndex]);
    }
    return heights;
  };

  const [barHeights, setBarHeights] = useState(() => generateInitialHeights(barCount));
  const [shimmerPosition, setShimmerPosition] = useState(-1);

  // Update bar count based on container width and barCounts prop
  useEffect(() => {
    const updateBarCount = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;

        // 1. Decrease wave width: Change group visual width from 72px
        const groupVisualWidth = 30; // px, reduced from 72px
        // Assuming mx-1 on group is 0.25rem on each side (e.g., 4px * 2 = 8px total horizontal margin for calculation)
        const groupEffectiveWidth = groupVisualWidth + 8;

        // 2. Decrease number of waves: barCounts prop acts as a max limit
        let calculatedGroupsThatFit = Math.floor(width / groupEffectiveWidth);
        calculatedGroupsThatFit = Math.max(1, calculatedGroupsThatFit); // Ensure at least one group if space allows

        const groupsToShow = Math.min(barCounts, calculatedGroupsThatFit);

        const newTotalBars = groupsToShow * 7;

        setBarCount(newTotalBars);
        setBarHeights(generateInitialHeights(newTotalBars));
      }
    };

    updateBarCount(); // Initial calculation
    window.addEventListener("resize", updateBarCount);
    return () => window.removeEventListener("resize", updateBarCount);
  }, [barCounts]); // Corrected dependency: listen to changes in barCounts prop

  useEffect(() => {
    const animate = () => {
      frameCount.current++;

      // Update shimmer effect only when recording
      if (isRecording && frameCount.current % barCounts === 0) {
        setShimmerPosition((prev) => (prev >= barCount ? -5 : prev + 1));
      }

      if (frameCount.current % animationSpeed === 0) {
        setBarHeights((prev) =>
          prev.map((_, index) => {
            const patternIndex = index % 7;
            const baseHeight = patternHeights[patternIndex];

            if (isRecording) {
              // Dynamic movement only when recording
              const time = Date.now() / 1000;
              const wave1 = Math.sin(time + index * 0.3) * 7;
              const wave2 = Math.cos(time * 1.2 + index * 0.2) * 5;
              const noise = Math.random() * 4 - 2;

              return Math.max(5, Math.min(40, baseHeight + wave1 + wave2 + noise));
            } else {
              // When not recording, just use the base pattern height without animation
              return baseHeight;
            }
          })
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording, animationSpeed, barCount]); // barCount (total bars) is a valid dependency here

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-end rounded-lg w-[80%] ${className}`}
      style={{ height: `${height}px`, background: "transparent" }}
    >
      <div className="flex items-center justify-center w-full h-full gap-1">
        {Array.from({ length: Math.floor(barCount / 7) }).map((_, groupIndex) => (
          <div
            key={groupIndex}
            className="flex items-center gap-1 mx-1"
            style={{ width: `${50}px` }} // Use the new reduced groupVisualWidth
          >
            {patternHeights.map((_, barIndex) => {
              const index = groupIndex * 7 + barIndex;
              const isShimmering = isRecording && Math.abs(shimmerPosition - index) < 2;
              // Bar width calculation uses the new groupVisualWidth (50px)
              const barWidth = 50 / 7 - 2.5; // 50 is the new groupVisualWidth

              return (
                <div
                  key={barIndex}
                  className="transition-all duration-200 bg-[#E8E9EA]"
                  style={{
                    height: `${barHeights[index]}px`,
                    width: `${barWidth}px`,
                    borderRadius: "4px",
                    position: "relative",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedWaveform;
