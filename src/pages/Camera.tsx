import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {random_thema} from './ImageUpload';

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

type Props = { // WebCamera関数の入力値
  entries: entries[];
  setEntries: React.Dispatch<React.SetStateAction<entries[]>>;
  indexId: number;
  setThema: React.Dispatch<React.SetStateAction<string | null>>;
  setIndexId_thema: React.Dispatch<React.SetStateAction<number>>;
  getRequiredPhotos: (entries: entries[]) => number;
};

const WebCamera = ({ entries, setEntries, indexId, setThema, setIndexId_thema, getRequiredPhotos  }: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // 外カメラ起動に必要な設定
  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: { exact: "environment" }
  };

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } catch (error) {
        console.error('カメラの許可が得られませんでした:', error);
        setHasPermission(false);
      }
    };

    checkCameraPermission();
  }, []);

  const capture = () => {
    const imageSrc: string = webcamRef.current?.getScreenshot() || '';
    setEntries((prevEntries) => (
      prevEntries.map((prevEntry) => (prevEntry.id === entries[indexId].id ? {...prevEntry, imgURL: [...prevEntry.imgURL, imageSrc]} : prevEntry))
    ));
    // random_thema を呼び出してお題を変更
    random_thema(setThema, setIndexId_thema);
  };

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (error) {
      console.error('カメラの許可が得られませんでした:', error);
    }
  };

// 現在の撮影枚数
const currentPhotos = entries?.[indexId].imgURL.length;
// 必要な枚数
const requiredPhotos = getRequiredPhotos(entries);
//  残りの撮影枚数（負の値にならないようにする）
const remainingPhotos = Math.max(0, requiredPhotos - currentPhotos);
  
  
  if (hasPermission === null) {
    return <div>カメラの許可を確認中...</div>;
  }

  if (hasPermission === false) {
    return (
      <div>
        <p>カメラの使用が許可されていません。</p>
        <button onClick={requestPermission} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">
          カメラの許可を求める
        </button>
      </div>
    );
  }

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">撮影</button>
      <p>残りの必要な撮影枚数: {remainingPhotos} 枚</p>

    </>
  );
};

export default WebCamera;