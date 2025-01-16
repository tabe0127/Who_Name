import Image from "next/image"
import Hint from "./Hint"
import { useState } from "react";

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

export default function Game({ setSceneController, entries }: { setSceneController : React.Dispatch<React.SetStateAction<string>>, entries: entries[] }){
  // 遊び方説明のモーダルを管理
  const [isOpenHint, setIsOpenHint] = useState<boolean>(false);

  const playSound = () => {
    const audio = new Audio('/sounds/card-flip.mp3');
    audio.play().catch((error) =>{
      console.error('効果音の再生に失敗しました：',error);
    });
  }; 

  function getRandomEntry(obj: entries[] ): {name: string, img: string} {
    const randomIndex = Math.floor(Math.random() * obj?.length);
    const randomImg = obj?.[randomIndex].imgURL[Math.floor(Math.random() * obj?.[randomIndex].imgURL.length)]
    return {name: obj?.[randomIndex].name, img: randomImg};
  }
  
  const [randomEntry, setRandomEntry] = useState<{name: string, img: string}>(getRandomEntry(entries))

  return(
    <>
    
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

      <div>
        初めて出た人の場合：この人の<b>あだ名</b>をつけよう！
      </div>

      <br></br>

      <div>
        再度出てきた場合：この人の<b>本名</b>と<b>あだ名</b>を素早く叫ぼう！
      </div>

      <br></br>

      {/* --- Nextボタン --- */}
      <div className="flex flex-col">
        <button
        onClick={() => {
          playSound(); // サウンド再生を呼び出す
          setRandomEntry(getRandomEntry(entries)); // エントリーを更新
          }}
          className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
  >
    Next
  </button>

<button
      onClick={() => setSceneController('Home')}
      className="p-4 text-white font-bold bg-red-400 rounded-xl shadow-lg m-2"
    >
      ゲームをやめる
    </button>



        {/* --- ヒントボタン --- */}
        <button onClick={()=>setIsOpenHint(true)} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">名付けのヒント</button>
      </div>
    </div>
    {/* --- ヒント --- */}
    <Hint isOpenHint={isOpenHint} setIsOpenHint={setIsOpenHint} />
    </>
  )
}