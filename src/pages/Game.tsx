import Image from "next/image"
import { useState, useEffect } from "react";
import CountdownTimer from "./Countdown";

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

export default function Game({ setSceneController, entries }: { setSceneController : React.Dispatch<React.SetStateAction<string>>, entries: entries[] }){

  const [audio, setAudio] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      setAudio(new Audio('/sounds/countdown.mp3'));
    }
  }, []);

  // const audio = new Audio('/sounds/countdown.mp3');
  const playSound = () => {
    audio?.play().catch((error) =>{
      console.error('効果音の再生に失敗しました：',error);
    });
  }; 

  function getRandomEntry(obj: entries[] ): {name: string, img: string} {
    const randomIndex = Math.floor(Math.random() * obj?.length);
    const randomImg = obj?.[randomIndex].imgURL[Math.floor(Math.random() * obj?.[randomIndex].imgURL.length)]
    return {name: obj?.[randomIndex].name, img: randomImg};
  }
  
  const [randomEntry, setRandomEntry] = useState<{name: string, img: string}>(getRandomEntry(entries))

  // CountdownTimer用
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startCountdown = async() => {
    console.log("開始");
    playSound(); // サウンド再生を呼び出す
    setTimeLeft(3); // 3秒のカウントダウン
    setIsRunning(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsRunning(false); // カウントダウン停止
    console.log("3秒後に実行");
  }
  audio?.addEventListener('ended', () => {
    // ここに音声再生後に実行したいコードを書きます
    console.log('音声再生が終了しました');
    // 他の処理を追加
    setRandomEntry(getRandomEntry(entries)); // エントリーを更新
  }, { once: true });

  return(
    <>
    <button
      onClick={() => setSceneController('Home')}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      ゲームをやめる
    </button>
    <div>
      {/* --- 表示 --- */}
      <div className="p-4">
        <Image
          src={randomEntry.img}
          alt={randomEntry.name}
          width={300}
          height={300}
          layout='responsive'
          className='max-h-72'
        />
        <p className="text-4xl text-amber-300 font-bold">{randomEntry.name}</p>
      </div>
      <CountdownTimer timeLeft={timeLeft} setTimeLeft={setTimeLeft} isRunning={isRunning} ></CountdownTimer>

      <div>
        初めて出た人の場合：この人の<b>あだ名</b>をつけよう！
      </div>

      <br></br>

      <div>
        再度出てきた場合：名付けた<b>あだ名</b>を素早く叫ぼう！
      </div>

      <br></br>

      {/* --- Nextボタン --- */}
      <div className="flex flex-col">
      <button
        onClick={startCountdown}
        className={`p-4 font-bold rounded-xl shadow-lg m-2 ${
          isRunning ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-400 text-white"
        }`}
        disabled={isRunning} // カウントダウン中は無効化
      >
        Next
      </button>
      </div>
    </div>
    </>
  )
}