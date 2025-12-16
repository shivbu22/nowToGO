import React from 'react';

const SnowfallEffect: React.FC = () => {
  const snowflakes = Array.from({ length: 350 }).map((_, i) => {
    const animationNames = ['snowfall-straight', 'snowfall-left', 'snowfall-right'];
    const animationName = animationNames[Math.floor(Math.random() * animationNames.length)];

    const style = {
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 4 + 1.5}px`,
      height: `${Math.random() * 4 + 1.5}px`,
      animationDuration: `${Math.random() * 8 + 5}s`,
      animationDelay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.5 + 0.4,
      animationName: animationName,
    };
    // The 'any' type is used here for style because animationName is a custom property not in standard CSSProperties
    return <div key={i} className="snowflake" style={style as any}></div>;
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {snowflakes}
    </div>
  );
};

export default SnowfallEffect;