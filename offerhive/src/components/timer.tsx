import { useState, useEffect } from 'react';

export default function Timer({ className }: { className?: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: any) => String(value).padStart(2, '0');
  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  const hourDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const minuteDeg = time.getMinutes() * 6;
  const secondDeg = time.getSeconds() * 6;

  return (
    <section className={`flex flex-col items-center justify-center gap-4 py-4 ${className} cursor-pointer hover:scale-105 transition-transform duration-300`}>

      {/* Analog Clock */}
      <div className="relative w-32 h-32 rounded-full border-4 border-yellow-400 flex items-center justify-center bg-white shadow-md">
        {/* Center Dot */}
        <div className="absolute w-2 h-2 bg-gray-700 rounded-full z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Hour Hand */}
        <div
          className="absolute w-1.5 h-6 sm:h-8 md:h-10 rounded-full bg-yellow-600"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `translateX(-50%) rotate(${hourDeg}deg)`,
            transformOrigin: 'bottom center'
          }}
        ></div>

        {/* Minute Hand */}
        <div
          className="absolute w-1 h-9 sm:h-12 md:h-14 rounded-full bg-yellow-400"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `translateX(-50%) rotate(${minuteDeg}deg)`,
            transformOrigin: 'bottom center'
          }}
        ></div>

        {/* Second Hand */}
        <div
          className="absolute w-0.5 h-10 sm:h-12 md:h-14 rounded-full bg-gray-300 shadow-sm"
          style={{
            left: '50%',
            bottom: '50%',
            transform: `translateX(-50%) rotate(${secondDeg}deg)`,
            transformOrigin: 'bottom center'
          }}
        ></div>

        {/* Clock Numbers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i + 1) * 30;
          const radius = 45;
          const x = radius * Math.sin((angle * Math.PI) / 180);
          const y = -radius * Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute text-xs font-bold text-yellow-600"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </section>
  );
}
