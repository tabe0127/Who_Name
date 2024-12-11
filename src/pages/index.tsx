import { useState } from 'react'
import React from 'react'
import Modal from './Modal'
import Hint from './Hint'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import img1 from '../assets/samples/IMG_8020.jpg'
// import img2 from '../assets/samples/IMG_8021.jpg'
// import img3 from '../assets/samples/IMG_8022.jpg'
// import img4 from '../assets/samples/IMG_8023.jpg'
// import img5 from '../assets/samples/IMG_8024.jpg'
// import img6 from '../assets/samples/IMG_8025.jpg'
// import img7 from '../assets/samples/IMG_8027.jpg'
// import img8 from '../assets/samples/IMG_8028.jpg'

export default function Home() {
  // 顔写真の更新管理
  const [count, setCount] = useState(0)
  // const samples = [img1, img2, img3, img4, img5, img6, img7, img8]
  // const names = ["やべ", "あしざわ", "とまと", "もり", "やべ", "あしざわ", "もり", "とまと"]

  // 顔写真のアップロード
  const [img, setImg] = useState<string[]>([])

  // ルール説明のモーダルを管理
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  // ルール説明のモーダルを管理
  const [isOpenHint, setIsOpenHint] = React.useState(false);

  return (
    <div className={styles.container}>
      <h1 className='text-5xl'>Who?Name!</h1>
      {/* --- ボタン --- */}
      <button onClick={()=>setIsOpenModal(true)} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">ルール</button>
      <input type="file" accept='image/*' onChange={(e)=>{
        if (!e.target.files) return;
        const temp = e.target.files[0]
        if (img.length == 0){
          setImg([window.URL.createObjectURL(temp)])  
        }else{
          setImg([...img, window.URL.createObjectURL(temp)])
        }
        console.log(img)
      }} />
      <div>
        <Image src={img[count]} alt={`Sample ${count + 1}`}width={300} height={300} />
        {/* <p>{names[count]}</p> */}
        <button onClick={()=>setIsOpenHint(true)} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">名付けのヒント</button>
      </div>
      <div className={styles.card}>
        <button onClick={() => setCount(Math.floor(Math.random() * img.length))} className='p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg'>
          Next
        </button>
      </div>
      {/* --- モーダル --- */}
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
      {/* --- ヒント --- */}
      <Hint isOpenHint={isOpenHint} setIsOpenHint={setIsOpenHint} />
    </div>
  )
}
