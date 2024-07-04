import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";

type ImageInputOptsProps = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ImageInputOpts: React.FC<ImageInputOptsProps> = ({ setImage }) => {
  const [showWebcam, setShowWebcam] = useState(false);

  const toggleWebcam = () => {
    setShowWebcam((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="dropbox w-40 h-40 border border-black mb-4"></div>
      <button onClick={toggleWebcam} className="btn btn-primary">
        {showWebcam ? "Hide Webcam" : "Show Webcam"}
      </button>
      {showWebcam && <WebcamCapture setImage={setImage} />}
    </div>
  );
};

export default ImageInputOpts;
