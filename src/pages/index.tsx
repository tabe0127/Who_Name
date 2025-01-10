import { useState } from 'react'
import React from 'react'
import styles from '../styles/Home.module.css'
import Start from './Home'
import InputName from './InputName'
import ImageUpload from './ImageUpload'
import Game from './Game'

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

export default function Home() {
  // どの画面を表示するかの管理
  const [sceneController, setSceneController] = useState<string>('Home')

  // 顔写真と名前の管理
  const [entries, setEntries] = useState<entries[]>([]);

  return (
    <div className={styles.container}>
      <h1 className="text-5xl mt-6">Who?Name!</h1>

      {sceneController=='Home' ? <Start setSceneController={setSceneController}></Start>: <></>}
      {sceneController=='Name' ? <InputName setSceneController={setSceneController} entries={entries} setEntries={setEntries}></InputName>:<></>}
      {sceneController=='ImageUpload' ? <ImageUpload setSceneController={setSceneController}  entries={entries} setEntries={setEntries} ></ImageUpload>:<></>}
      {sceneController=='Game' ? <Game setSceneController={setSceneController}  entries={entries} ></Game>:<></>}

    </div>
  );
}

