import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';


const WebCamera = ({ setTempImg }: { setTempImg : React.Dispatch<React.SetStateAction<string | null>>}) => {
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
      <button onClick={capture} className="my-4 p-4 text-white font-bold bg-blue-400 rounded-xl shadow-lg">撮影</button>
    </>
  );
};

export default WebCamera;
