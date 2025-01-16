import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Image from "next/image"


const WebCamera = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string>('');

  const capture = useCallback(() => {
    const imageSrc: string= webcamRef.current?.getScreenshot() || '';
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>撮影</button>
      {imgSrc && <Image src={imgSrc} alt="captured" width={150} height={150} />}
    </>
  );
};

export default WebCamera;
