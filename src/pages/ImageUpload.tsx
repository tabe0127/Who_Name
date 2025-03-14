import { useState, useEffect } from "react";
import Image from "next/image";
// import soraki from '../assets/samples/IMG_8278.jpg'
// import tabe from '../assets/samples/IMG_8279.jpg'
// import ise from '../assets/samples/IMG_8281.jpg'
import WebCamera from "./Camera";

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

// お題一覧
const themaList = ["趣味", "サークル・部活動", "好きなスポーツ", "好きな生き物", "好きなキャラクター", "好きなお笑い芸人", "マイブーム", "好きな偉人", "特技"];

export const random_thema = (setThema: React.Dispatch<React.SetStateAction<string | null>>, setIndexId_thema: React.Dispatch<React.SetStateAction<number>>) => {
  const randomIndex = Math.floor(Math.random() * themaList.length);
  setThema(themaList[randomIndex]);
  setIndexId_thema(randomIndex);  // インデックスを更新
};

export default function ImageUpload({ setSceneController, entries, setEntries}: { setSceneController : React.Dispatch<React.SetStateAction<string>>, entries: entries[], setEntries : React.Dispatch<React.SetStateAction<entries[]>> }){

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

  // プレイヤー人数に応じて、各プレイヤーごとに必要な写真の枚数を返す関数
  // 元々、人数に応じて枚数の変更を加えていたが、2025/03/07の話し合いで「2枚で固定で良いのでは？」となった
  // 正直この関数いらないが、一旦放置
  const getRequiredPhotos = 2;

  const nextPlayer = () => {
    // 必要な写真枚数を取得
    const requiredPhotos = getRequiredPhotos;
  
    // 条件付きで処理を実行
    return entries[indexId].imgURL.length < requiredPhotos
      ? alert(`写真を${requiredPhotos}枚以上登録してください`)
      : setIndexId((prev) => prev + 1), window.scrollTo(0, 0); // ページの一番上にスクロール
  };

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

  useEffect(() => {
    random_thema(setThema,setIndexId_thema);
  }, []);

  return(
    <>

    <ol
    style={{
      listStyleType: "decimal",
      textAlign: "left",
      marginLeft: "20px",
      border: "4px solid #FE347E", // ボックスの枠線を追加
      padding: "10px",          // ボックス内の余白を追加
      borderRadius: "8px",      // ボックスの角を丸める（オプション）
      //backgroundColor: "#f9f9f9", // 背景色を追加（オプション）
    }}
    className="mt-4"
    >
      <ul><span className="font-bold">お題にちなんだポーズ</span>で<span className="text-amber-300 text-2xl font-bold">{entries?.[indexId].name}</span>さんの写真を<span className="text-amber-300 text-2xl font-bold">{indexId === 0 ? entries?.[entries.length - 1].name : entries?.[indexId - 1].name}</span>さんが撮影してね！</ul>
      {/* <ul>{getRequiredPhotos(entries)}枚以上撮ってください</ul> */}
      <ul>全員分の写真が集まったらゲームスタート！</ul>
      {/* <p className="mt-4">ポーズの例</p> */}
      <div
      className="flex flex-wrap justify-center md:flex-col md:items-start"
      style={{ gap: "10px" }}
      >
      </div>
    </ol>

    <div
      style={{
        borderTop: "4px dotted gray", // 点線のスタイル
        marginTop: "16px",            // 上の要素との間隔
        width: "100%",                // 横幅を画面全体に
      }}
    ></div>

    <p className="mt-4">お題：「{thema}」　にちなんだ写真を撮ってください．</p>

    <button type="button" onClick={ThemaChange} className="my-4 p-4 text-white font-bold bg-green-400 rounded-xl shadow-lg mx-2">お題を変更する</button>

    <div
      style={{
        borderTop: "4px dotted gray", // 点線のスタイル
        marginTop: "16px",            // 上の要素との間隔
        width: "100%",                // 横幅を画面全体に
      }}
    ></div>

    <WebCamera 
      entries={entries} 
      setEntries={setEntries} 
      indexId={indexId} 
      setThema={setThema} 
      setIndexId_thema={setIndexId_thema} 
      getRequiredPhotos={getRequiredPhotos}
      ></WebCamera>

    {/* 画像プレビュー */}
    {entries?.[indexId].imgURL.length > 0 && (
      <div
        style={{
          border: "2px solid #ccc",   // ボックスの枠線
          borderRadius: "8px",        // 角丸の設定
          padding: "16px",            // 内側の余白
          marginTop: "16px",          // 上部の余白
        }}
      >
        <p className="font-semibold">
          <span className="text-amber-300 text-2xl">
            {entries?.[indexId].name}
          </span>
          さんの登録済写真
        </p>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {entries?.[indexId].imgURL.map((img, index) => (
            <div className="mb-2 relative mr-2" key={index}>
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
            </div>
          ))}
        </div>
      </div>
    )}

    <div
      style={{
        borderTop: "4px dotted gray", // 点線のスタイル
        marginTop: "16px",            // 上の要素との間隔
        width: "100%",                // 横幅を画面全体に
      }}
    ></div>

    <div className="flex justify-center gap-4 mt-4">
    <button
      onClick={() => setSceneController('Name')}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      {entries?.[indexId].imgURL.length >= 0 && "プレイヤー登録に戻る"}
    </button>

    {indexId < entries?.length - 1 &&
    <button
      onClick={nextPlayer}
      className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
    >
      次のプレイヤーの写真を登録
    </button>}

    {indexId === entries?.length - 1 && entries?.[indexId].imgURL.length >= 2 && (
      <button
        onClick={() => setSceneController('Game')}
        className="p-4 text-white font-bold bg-red-400 rounded-xl shadow-lg m-2"
      >
        ゲーム開始
      </button>
      )}
      </div>
    </>
  )
}