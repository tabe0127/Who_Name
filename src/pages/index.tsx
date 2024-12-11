import { useState, useRef } from 'react'
import React from 'react'
import Modal from './Modal'
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
  const filePickerRef = useRef<HTMLInputElement>(null);
  const showFolder = () => {
    if (filePickerRef.current) {
      filePickerRef.current.click();
    }
  };
  
  // ルール説明のモーダルを管理
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  return (
    <div className={styles.container}>
      <h1 className='text-5xl'>Who?Name!</h1>
      {/* --- ルールボタン --- */}
      <button onClick={()=>setIsOpenModal(true)} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">ルール</button>
      <input type="file" accept='image/*' ref={filePickerRef} hidden onChange={(e)=>{
        if (!e.target.files) return;
        const temp = e.target.files[0]
        if (img.length == 0){
          setImg([window.URL.createObjectURL(temp)])  
        }else{
          setImg([...img, window.URL.createObjectURL(temp)])
        }
        console.log(img)
      }} />
      <button type="button" onClick={showFolder} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">写真をアップロードする</button>
      <div className='p-4'>
        <Image src={img[count]} alt={""} width={0} height={0} layout='responsive' className='max-h-96 max-w-full'/>
        {/* <p>{names[count]}</p> */}
      </div>
      <div className={styles.card}>
        <button onClick={() => setCount(Math.floor(Math.random() * img.length))} className='p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg'>
          Next
        </button>
      </div>
      {/* --- ルールモーダル --- */}
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </div>
  )
}
