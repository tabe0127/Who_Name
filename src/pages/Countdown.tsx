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
    }, [isRunning, timeLeft, setTimeLeft]);

    const formatTime = (time: number) => {
        return time;
    };

    const getDisplayContent = () => {
        if (isRunning) {
          return <p className="font-bold">次の画像まで<span className="font-bold text-4xl text-blue-500">{formatTime(timeLeft)}</span></p>; // trueの場合
        } else {
          return <p className="font-bold">Nextを押すと3秒後に画像が切り替わるよ</p> // falseの場合
        }
      };
      
      return (
        <div className="h-9">
          {getDisplayContent()}
        </div>
      );
};