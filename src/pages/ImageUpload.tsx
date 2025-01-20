import { useState } from "react";
import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'
import WebCamera from "./Camera";

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

// お題一覧
const themaList = ["趣味", "サークル", "好きなスポーツ", "好きな生き物", "好きなキャラクター"];

export default function ImageUpload({ setSceneController, entries, setEntries }: { setSceneController : React.Dispatch<React.SetStateAction<string>>, entries: entries[], setEntries : React.Dispatch<React.SetStateAction<entries[]>> }){

  // entriesの何番目の要素かを管理
  const [indexId, setIndexId] = useState<number>(0);

  // 写真撮影時に提示するお題
  const [thema, setThema] = useState<string | null>(themaList ? themaList[themaList.length - 1] : "");

  // themaListの何番目の要素かを管理
  const [indexId_thema, setIndexId_thema] = useState<number>(0);

  // 登録された画像の削除処理
  const handleDelete = (index: number) => {
    const tmp = entries[indexId].imgURL.splice(index,1);
    setEntries((prev) =>
      prev.map((e) =>
        e.id === indexId ? { ...e, ImgURL: tmp } : e
      ));
  };

  const nextPlayer = () => {
    if(entries[indexId].imgURL.length < 2){
      alert('写真を2枚以上登録してください');
    } else {
      setIndexId((prev) => (prev + 1));
    }
  }

  // お題変更
  const ThemaChange = () => {
    if (themaList) {
      if (indexId_thema < themaList.length - 1) {
        setIndexId_thema(indexId_thema + 1);
      }
      else {
        setIndexId_thema(0);
      }
      setThema(themaList[indexId_thema]);
    }
  }

  return(
    <>
    <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }} className="mt-4">
      <ul><button type="button"className="p-2 text-white font-bold bg-blue-400 rounded-xl shadow-lg">写真を追加する</button>ボタンを押して<br /><span className="font-bold">いろんなポーズ</span>で<span className="text-amber-300 text-2xl font-bold">{entries?.[indexId].name}</span>さんの写真を<span className="text-amber-300 text-2xl font-bold">{indexId === 0 ? entries?.[entries.length - 1].name : entries?.[indexId - 1].name}</span>さんが撮影・アップロードしてね！</ul>
      <ul>※プレイ人数が4人以下なら1人3枚、5人以上なら1人2枚推奨</ul>
      <ul>全員分の写真が集まったらゲームスタート！</ul>
    </ol>
    <p className="mt-4">ポーズの例</p>
    <div className="flex">
      <Image src={soraki} alt={"soraki"} width={110}  />
      <Image src={tabe} alt={"tabe"} width={110} />
      <Image src={ise} alt={"ise"} width={110} />
    </div>
    <p className="mt-4">お題：「{thema}」</p>
    <p className="mt-4">「{thema}」にちなんだ写真を撮ってください．</p>

    <button type="button" onClick={ThemaChange} className="my-4 p-4 text-white font-bold bg-green-400 rounded-xl shadow-lg mx-2">お題を変更する</button>

    <WebCamera entries={entries} setEntries={setEntries} indexId={indexId}></WebCamera>

    {/* 画像プレビュー */}
    {entries?.[indexId].imgURL.length > 0 && <p className="font-semibold">追加された写真</p>}
    {entries?.[indexId].imgURL.length > 0 && (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {entries?.[indexId].imgURL.map((img, index) => 
        <div className="mb-2 relative mr-2" key={index}>
          {
            <>
              <Image
                src={img}
                alt="Preview"
                width={150}
                height={150}
                className="rounded-lg"
              />
              <button
                onClick={() => {handleDelete(index)}}
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                style={{ transform: 'translate(50%, -50%)' }}
              >
                ×
              </button>
            </>
          }
        </div>
        )}
    </div>)}
    {indexId < entries?.length - 1 &&
    <button
      onClick={nextPlayer}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      次へ
    </button>}
    <button
      onClick={() => setSceneController('Name')}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      {entries?.[indexId].imgURL.length == 0 && "戻る"}
      {entries?.[indexId].imgURL.length > 0 && "プレイヤーを追加する"}
    </button>
    { indexId === entries?.length - 1 && entries?.[indexId].imgURL.length >= 2 &&
    <button
    onClick={() => setSceneController('Game')}
    className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >ゲーム開始</button>
    }
    </>
  )
}