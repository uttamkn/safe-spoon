import React from "react";
import Webcam from "react-webcam";

type WebcamCaptureProps = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ setImage }) => {
  const webcamRef = React.useRef<Webcam>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc || "");
  };

  return (
    <div className="w-full">
      <Webcam
        audio={false}
        height={680}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={680}
        videoConstraints={videoConstraints}
      />
      <button
        onClick={capture}
        className="p-2 bg-slate-300 text-primary rounded-md w-full mx-auto"
      >
        Capture photo
      </button>
    </div>
  );
};

export default WebcamCapture;
