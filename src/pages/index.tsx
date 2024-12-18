import { useState } from 'react'
import React from 'react'
import styles from '../styles/Home.module.css'
import Start from './Start'
import Hint from './Hint'

export default function Home() {
  const [sceneController, setSceneController] = useState<string>('Start')

  return (
    <div className={styles.container}>
      <h1 className="text-5xl">Who?Name!</h1>

      {sceneController=='Start' ? <Start setSceneController={setSceneController}></Start>: <></>}
      {sceneController=='Name' ? <Hint></Hint>:<></>}
      <p>{sceneController}</p>

    </div>
  );
}
