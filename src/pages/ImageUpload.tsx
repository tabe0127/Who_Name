import { useState, useRef } from "react";
import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'

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

  // 一時的な画像を管理
  const [tempImg, setTempImg] = useState<string | null>(null);

  // 写真撮影時に提示するお題
  const [thema, setThema] = useState<string | null>(themaList ? themaList[themaList.length - 1] : "");

  // themaListの何番目の要素かを管理
  const [indexId_thema, setIndexId_thema] = useState<number>(0);

  // 一時的な画像アップロード処理
  const handleTempImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const tempFile = e.target.files[0];
    const tempImgUrl = window.URL.createObjectURL(tempFile);
    setTempImg(tempImgUrl);
  };

  // 画像登録処理
  const handleRegisterEntry = () => {
    if (tempImg == null) {
      alert('写真をアップロードしてください');
      return
    }
    setEntries((prevEntries) => (
      prevEntries.map((prevEntry) => (prevEntry.id === entries[indexId].id ? {...prevEntry, imgURL: [...prevEntry.imgURL, tempImg]} : prevEntry))
    ));
    setTempImg(null); // 一時的な画像をリセット
  };

  const filePickerRef = useRef<HTMLInputElement>(null);
  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
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
      <ul><button type="button"className="p-2 text-white font-bold bg-blue-400 rounded-xl shadow-lg">写真を追加する</button>ボタンを押して<br /><span className="font-bold">いろんなポーズ</span>で<span className="text-amber-300 text-2xl font-bold">{entries[indexId].name}</span>さんの写真を（右隣の人が撮影・）←入れるか要検討（入れる場合には，別途ブランチを立ててマージする必要あり）アップロードしてね！</ul>
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

    {/* ファイルアップロード */}
    <input
      type="file"
      accept="image/*"
      ref={filePickerRef}
      onChange={handleTempImgUpload}
      className="mb-2"
      hidden
      />
    <button type="button" onClick={showFolder} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg mx-2">写真を追加する</button>

    {/* 追加された写真一覧 */}
    <div>
      {tempImg && (
        <div className="mb-2">
          <p>プレビュー</p>
          <Image
            src={tempImg}
            alt="Preview"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>
      )}
    </div>

    {/* 登録ボタン */}
    {tempImg && (
    <button
      onClick={handleRegisterEntry}
      className="p-2 bg-green-500 text-white rounded-md shadow-lg"
    >
      この画像を追加
    </button>
    )}

    {/* 画像プレビュー */}
    {entries[indexId].imgURL.length > 0 && <p className="font-semibold">追加された写真</p>}
    {entries[indexId].imgURL.length > 0 && (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {entries[indexId].imgURL.map((img, index) => 
        <div className="mb-2" key={index}>
          {
            <Image
              src={img}
              alt="Preview"
              width={150}
              height={150}
              className="rounded-lg"
            />
          }
        </div>
        )}
    </div>)}
    {indexId < entries.length - 1 &&
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
      {entries[indexId].imgURL.length == 0 && "戻る"}
      {entries[indexId].imgURL.length > 0 && "プレイヤーを追加する"}
    </button>
    { indexId === entries.length - 1 && entries[indexId].imgURL.length >= 2 &&
    <button
    onClick={() => setSceneController('Game')}
    className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >ゲーム開始</button>
    }
    </>
  )
}