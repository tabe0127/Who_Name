import { useState, useRef } from "react";
import Image from "next/image";
import soraki from '../assets/samples/IMG_8278.jpg'
import tabe from '../assets/samples/IMG_8279.jpg'
import ise from '../assets/samples/IMG_8281.jpg'

export default function ImageUpload({ setSceneController, entries, setEntries, nameSelected }: { setSceneController : React.Dispatch<React.SetStateAction<string>>, entries: {[Name: string]: string[]}, setEntries : React.Dispatch<React.SetStateAction<{[Name: string]: string[]}>>, nameSelected : string }){

  // 一時的な画像を管理
  const [tempImg, setTempImg] = useState<string | null>(null);

  // 一時的な画像アップロード処理
  const handleTempImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const tempFile = e.target.files[0];
    const tempImgUrl = window.URL.createObjectURL(tempFile);
    setTempImg(tempImgUrl);
  };

  // 値を追加または更新する関数
  const addToEntries = (key: string, value: string) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [key]: key in prevEntries ? [...prevEntries[key], value] : [value],
    }));
  };

  // 画像登録処理
  const handleRegisterEntry = () => {
    if (tempImg == null) {
      alert('写真を1枚以上アップロードしてください');
      return
    }
    addToEntries(nameSelected, tempImg);
    setTempImg(null); // 一時的な画像をリセット
  };

  const filePickerRef = useRef<HTMLInputElement>(null);
  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  return(
    <>
    <ol style={{ listStyleType: "decimal" , textAlign: "left", marginLeft: "20px" }} className="mt-4">
      <ul><button type="button"className="p-2 text-white font-bold bg-blue-400 rounded-xl shadow-lg">写真を追加する</button>ボタンを押して<br /><span className="font-bold">いろんなポーズ</span>で<span className="text-amber-300 text-2xl font-bold">{nameSelected}</span>さんの写真をアップロードしてね！</ul>
      <ul>※プレイ人数が4人以下なら1人3枚、5人以上なら1人2枚推奨</ul>
      <ul>全員分の写真が集まったらゲームスタート！</ul>
    </ol>
    <p className="mt-4">ポーズの例</p>
    <div className="flex">
      <Image src={soraki} alt={"soraki"} width={110}  />
      <Image src={tabe} alt={"tabe"} width={110} />
      <Image src={ise} alt={"ise"} width={110} />
    </div>

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
    {entries[nameSelected].length > 0 && <p className="font-semibold">追加された写真</p>}
    {entries[nameSelected].length > 0 && (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        {entries[nameSelected].map((img, index) => 
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
    <button
      onClick={() => setSceneController('Name')}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      {entries[nameSelected].length == 0 && "戻る"}
      {entries[nameSelected].length > 0 && "プレイヤーを追加する"}
    </button>
    {Object.keys(entries).length > 0 && entries[nameSelected].length > 0 &&
    <button
    onClick={() => setSceneController('Game')}
    className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >ゲーム開始</button>
    }
    </>
  )
}