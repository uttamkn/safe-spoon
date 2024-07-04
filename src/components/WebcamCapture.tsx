import React from "react";
import Webcam from "react-webcam";

type WebcamCaptureProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ image, setImage }) => {
  const webcamRef = React.useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc || "");
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default WebcamCapture;
