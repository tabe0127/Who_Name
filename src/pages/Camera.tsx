import React, { useRef, useCallback, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const WebCamera = ({ setTempImg }: { setTempImg: React.Dispatch<React.SetStateAction<string | null>> }) => {
  const webcamRef = useRef<Webcam>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

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

  const capture = useCallback(() => {
    const imageSrc: string = webcamRef.current?.getScreenshot() || '';
    setTempImg(imageSrc);
  }, [webcamRef, setTempImg]);

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
      />
      <button onClick={capture} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">撮影</button>
    </>
  );
};

export default WebCamera;
