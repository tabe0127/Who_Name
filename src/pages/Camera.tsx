import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCamera = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
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
      {imgSrc && <img src={imgSrc} alt="captured" />}
    </>
  );
};

export default WebCamera;
