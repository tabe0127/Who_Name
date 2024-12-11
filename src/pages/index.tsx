import { useState } from 'react'
import React from 'react'
import Modal from './Modal'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  // 顔写真と名前の管理
  const [entries, setEntries] = useState<{ img: string; name: string }[]>([]);
  const [count, setCount] = useState(0); // 現在表示中のエントリインデックス
  const [name, setName] = useState(''); // 名前の入力

  // モーダルの管理
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  // エントリを追加する処理
  const handleAddEntry = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const tempFile = e.target.files[0];
    const tempImgUrl = window.URL.createObjectURL(tempFile);

    if (name.trim() === '') {
      alert('名前を入力してください！');
      return;
    }

    setEntries([...entries, { img: tempImgUrl, name }]);
    setName(''); // 入力フィールドをリセット
  };

  return (
    <div className={styles.container}>
      <h1 className="text-5xl">Who?Name!</h1>

      {/* --- ボタン --- */}
      <button
        onClick={() => setIsOpenModal(true)}
        className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg"
      >
        ルール
      </button>

      {/* 名前入力フォーム */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
        className="my-2 p-2 border rounded-md"
      />

      {/* ファイルアップロード */}
      <input
        type="file"
        accept="image/*"
        onChange={handleAddEntry}
        className="my-2"
      />

      {/* 表示 */}
      {entries.length > 0 && (
        <div>
          <Image
            src={entries[count].img}
            alt={`Sample ${count + 1}`}
            width={300}
            height={300}
          />
          <p>{entries[count].name}</p>
        </div>
      )}

      {/* Nextボタン */}
      <div className={styles.card}>
        <button
          onClick={() =>
            setCount(Math.floor(Math.random() * entries.length))
          }
          className="p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg"
        >
          Next
        </button>
      </div>

      {/* --- モーダル --- */}
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  );
}
