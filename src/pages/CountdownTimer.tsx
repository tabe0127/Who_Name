import { useEffect } from 'react';

export default function CountdownTimer({ timeLeft, setTimeLeft, isRunning }: { timeLeft: number, setTimeLeft : React.Dispatch<React.SetStateAction<number>>, isRunning: boolean }){
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <p>{isRunning ? formatTime(timeLeft) : '00:00'}</p>
    </div>
  );
};
