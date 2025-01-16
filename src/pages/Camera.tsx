import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Image from "next/image"


const WebCamera = ({tempImg, setTempImg }: { tempImg: string, setTempImg : React.Dispatch<React.SetStateAction<string>>}) => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc: string= webcamRef.current?.getScreenshot() || '';
    setTempImg(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>撮影</button>
      {tempImg && <Image src={tempImg} alt="captured" width={150} height={150} />}
    </>
  );
};

export default WebCamera;
