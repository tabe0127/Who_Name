import { useState, useRef } from 'react';
import React from 'react';
import Modal from './Modal';
import Hint from './Hint';
import Image from 'next/image';
import Mem from './mem'; // mem.tsx をインポート
import styles from '../styles/Home.module.css';

export default function Home() {
  // 状態管理
  const [entries, setEntries] = useState<{ img: string; name: string }[]>([]);
  const [count, setCount] = useState(0); 
  const [tempImg, setTempImg] = useState<string | null>(null);
  const [tempName, setTempName] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showStartScreen_StartButton, setShowStartScreen_StartButton] = useState(false);
  const [showGameScreen, setShowGameScreen] = useState(false);
  const [isOpenHint, setIsOpenHint] = useState(false);
  const [showMemScreen, setShowMemScreen] = useState(false); // mem.tsx の画面表示用

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleTempImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const tempFile = e.target.files[0];
    const tempImgUrl = window.URL.createObjectURL(tempFile);
    setTempImg(tempImgUrl);
  };

  const handleRegisterEntry = () => {
    if (!tempImg || tempName.trim() === '') {
      alert('写真と名前の両方を入力してください！');
      return;
    }

    setEntries([...entries, { img: tempImg, name: tempName }]);
    setTempImg(null);
    setTempName('');
    setShowStartScreen_StartButton(true);
  };

  const GameStart = () => {
    setShowStartScreen(false);
    setShowStartScreen_StartButton(false);
    setShowGameScreen(true);
  };

  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-5xl">Who?Name!</h1>

      {/* 遊び方ボタン */}
      <button
        onClick={() => setIsOpenModal(true)}
        className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg"
      >
        遊び方
      </button>

      {/* スタート画面 */}
      {showStartScreen && (
        <div className="my-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-2xl mb-2">写真と名前を登録</h2>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="名前を入力"
            className="mb-2 p-2 border rounded-md w-full"
          />
          <input
            type="file"
            accept="image/*"
            ref={filePickerRef}
            onChange={handleTempImgUpload}
            className="mb-2"
            hidden
          />
          <button type="button" onClick={showFolder} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg mx-2">
            写真をアップロードする
          </button>
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
          <button
            onClick={handleRegisterEntry}
            className="p-2 bg-green-500 text-white rounded-md shadow-lg"
          >
            登録
          </button>
        </div>
      )}

      {/* スタートボタン */}
      {showStartScreen_StartButton && (
        <div>
          <button
            onClick={GameStart}
            className="p-2 bg-red-500 text-white rounded-md shadow-lg"
          >
            Game Start
          </button>
        </div>
      )}

      {/* ゲーム画面 */}
      {showGameScreen && (
        <div>
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
          {entries.length > 0 && (
            <div className={styles.card}>
              <button
                onClick={() => setCount(Math.floor(Math.random() * entries.length))}
                className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg m-2"
              >
                Next
              </button>
              <button onClick={() => setIsOpenHint(true)} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">
                名付けのヒント
              </button>
            </div>
          )}
        </div>
      )}

      

      {/* mem.tsx を表示 */}
      <Mem />

      {/* モーダル */}
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      {/* ヒント */}
      <Hint isOpenHint={isOpenHint} setIsOpenHint={setIsOpenHint} />
    </div>
  );
}
