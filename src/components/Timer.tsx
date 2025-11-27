import React, { useEffect, useState } from "react";

interface TimerProps {
  onExpire: () => void;
  duration?: number; // in seconds
}

const Timer: React.FC<TimerProps> = ({ onExpire, duration = 600 }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [onExpire]);

  const m = Math.floor(time / 60);
  const s = time % 60;

  return (
    <p>
      Expires in: {m}' {String(s).padStart(2, "0")}"
    </p>
  );
};

export default Timer;

