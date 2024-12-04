import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import img1 from '../assets/samples/IMG_8020.jpg'
import img2 from '../assets/samples/IMG_8021.jpg'
import img3 from '../assets/samples/IMG_8022.jpg'
import img4 from '../assets/samples/IMG_8023.jpg'
import img5 from '../assets/samples/IMG_8024.jpg'
import img6 from '../assets/samples/IMG_8025.jpg'
import img7 from '../assets/samples/IMG_8027.jpg'
import img8 from '../assets/samples/IMG_8028.jpg'

export default function Home() {
  const [count, setCount] = useState(0)
  const samples = [img1, img2, img3, img4, img5, img6, img7, img8]
  const names = ["やべ", "あしざわ", "とまと", "もり", "やべ", "あしざわ", "もり", "とまと"]

  return (
    <div className={styles.container}>
      <h1>Who?Name!</h1>
      <div>
        <Image src={samples[count]} alt={`Sample ${count + 1}`}height={300} />
        <p>{names[count]}</p>
      </div>
      <div className={styles.card}>
        <button onClick={() => setCount(Math.floor(Math.random() * 8))}>
          Next
        </button>
      </div>
    </div>
  )
}
