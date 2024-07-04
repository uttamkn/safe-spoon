import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import { useDropzone } from "react-dropzone";

type ImageInputOptsProps = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ImageInputOpts: React.FC<ImageInputOptsProps> = ({ setImage }) => {
  const [showWebcam, setShowWebcam] = useState(false);

  const toggleWebcam = () => {
    setShowWebcam((prevState) => !prevState);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className="py-32 px-4 border-2 border-dashed border-ternery rounded-md cursor-pointer mb-4"
      >
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select one</p>
      </div>
      <button
        onClick={toggleWebcam}
        className="p-2 bg-ternery text-white rounded-md w-40 m-auto"
      >
        {showWebcam ? "Hide Webcam" : "Show Webcam"}
      </button>
      {showWebcam && <WebcamCapture setImage={setImage} />}
    </div>
  );
};

export default ImageInputOpts;
