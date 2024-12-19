import Image from "next/image"
import Hint from "./Hint"
import { useState } from "react";

export default function Game({ setSceneController, entries }: { setSceneController : React.Dispatch<React.SetStateAction<string>>, entries: {[Name: string]: string[]} }){
  // 遊び方説明のモーダルを管理
  const [isOpenHint, setIsOpenHint] = useState<boolean>(false);

  function getRandomEntry(obj: { [key: string]: string[] }): {name: string, img: string} {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const randomArray = obj[randomKey];
    const randomValue = randomArray[Math.floor(Math.random() * randomArray.length)];
    return {name: randomKey, img: randomValue};
  }
  
  const [randomEntry, setRandomEntry] = useState<{name: string, img: string}>(getRandomEntry(entries))

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
        <p>{randomEntry.name}</p>
      </div>

      {/* --- Nextボタン --- */}
      <div className="flex flex-col">
        <button
          onClick={() => setRandomEntry(getRandomEntry(entries))}
          className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
        >
          Next
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