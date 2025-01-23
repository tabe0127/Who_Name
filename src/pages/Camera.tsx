import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

type entries = {
  id: number;
  name: string;
  imgURL: string[];
}

const WebCamera = ({ entries, setEntries, indexId }: { entries: entries[], setEntries : React.Dispatch<React.SetStateAction<entries[]>>, indexId: number }) => {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // 外カメラ起動に必要な設定
  const videoConstraints = {
    width: 720,
    height: 360,
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
  };

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasPermission(true);
    } catch (error) {
      console.error('カメラの許可が得られませんでした:', error);
    }
  };

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
    </>
  );
};

export default WebCamera;
