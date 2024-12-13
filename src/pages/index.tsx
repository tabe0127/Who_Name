import { useState, useRef } from 'react'
import React from 'react'
import Modal from './Modal'
import Hint from './Hint'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  // 顔写真と名前の管理
  const [entries, setEntries] = useState<{ img: string; name: string }[]>([]);
  const [count, setCount] = useState(0); // 現在表示中のエントリインデックス

  // 登録フォームの状態管理
  const [tempImg, setTempImg] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');

  // モーダルの管理
  const [isOpenModal, setIsOpenModal] = useState(false);

  // スタート画面の表示のON・OFF
  const [showStartScreen, setShowStartScreen] = useState(true);

  // スタート画面上のStartボタンを表示するタイミングを検討する時間
  const [showStartScreen_StartButton, setShowStartScreen_StartButton] = useState(false);

  // ゲーム画面の表示のON・OFF
  const [showGameScreen, setShowGameScreen] = useState(false);

  // 一時的な画像アップロード処理
  const handleTempImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const tempFile = e.target.files[0];
    const tempImgUrl = window.URL.createObjectURL(tempFile);
    setTempImg(tempImgUrl);
  };

  // エントリ登録処理
  const handleRegisterEntry = () => {
    if (!tempImg || tempName.trim() === '') {
      alert('写真と名前の両方を入力してください！');
      return;
    }

    setEntries([...entries, { img: tempImg, name: tempName }]);
    setTempImg(null); // 一時的な画像をリセット
    setTempName(''); // 名前入力をリセット
    setShowStartScreen_StartButton(true);  // ゲームスタートボタンを表示
  };

  // ゲームスタート処理
  const GameStart = () => {
    setShowStartScreen(false);
    setShowStartScreen_StartButton(false);
    setShowGameScreen(true);
  }

  const filePickerRef = useRef<HTMLInputElement>(null);
  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  // 遊び方説明のモーダルを管理
  const [isOpenHint, setIsOpenHint] = React.useState(false);

  return (
    <div className={styles.container}>
      <h1 className="text-5xl">Who?Name!</h1>

      {/* --- ボタン --- */}
      <button
        onClick={() => setIsOpenModal(true)}
        className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg"
      >
        遊び方
      </button>


      {/* アプリ起動時（ゲーム開始前）に表示する画面 */}
      {/* --- 一括登録フォーム --- */}
      {showStartScreen && (
        <div className="my-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-2xl mb-2">写真と名前を登録</h2>

          {/* 名前入力 */}
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="名前を入力"
            className="mb-2 p-2 border rounded-md w-full"
          />

          {/* ファイルアップロード */}
          <input
            type="file"
            accept="image/*"
            ref={filePickerRef}
            onChange={handleTempImgUpload}
            className="mb-2"
            hidden
          />
          <button type="button" onClick={showFolder} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg mx-2">写真をアップロードする</button>

          {/* プレビュー */}
          {tempImg && (
            <div className="mb-2">
              <Image
                src={tempImg}
                alt="Preview"
                width={150}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}

          {/* 登録ボタン */}
          <button
            onClick={handleRegisterEntry}
            className="p-2 bg-green-500 text-white rounded-md shadow-lg"
          >
            登録
          </button>
        </div>
      )}

      {/* スタート画面からゲーム画面に遷移するためのボタン */}
      {showStartScreen_StartButton && (
        <div>
          {/* 登録ボタン */}
          <button
            onClick={GameStart}
            className="p-2 bg-red-500 text-white rounded-md shadow-lg"
          >
            Game Start
          </button>
        </div>
      )}

      {/* ゲーム開始時に表示する画面 */}
      {showGameScreen && (
        <div>
        {/* --- 表示 --- */}
        {entries.length > 0 && (
          <div className="p-4">
            <Image
              src={entries[count].img}
              alt={`Sample ${count + 1}`}
              width={300}
              height={300}
              layout='responsive'
              className='max-h-72'
            />
            <p>{entries[count].name}</p>
          </div>
        )}

        {/* --- Nextボタン --- */}
        {entries.length > 0 && (
          <div className={styles.card}>
            <button
              onClick={() => setCount(Math.floor(Math.random() * entries.length))}
              className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
            >
              Next
            </button>
            {/* --- ヒントボタン --- */}
            <button onClick={()=>setIsOpenHint(true)} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">名付けのヒント</button>
          </div>
        )}
        
        {/* --- モーダル --- */}
        <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
        {/* --- ヒント --- */}
        <Hint isOpenHint={isOpenHint} setIsOpenHint={setIsOpenHint} />
        </div>
      )}
      
    </div>
  );
}
