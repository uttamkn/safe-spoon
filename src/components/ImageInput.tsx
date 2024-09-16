import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Image as ImageIcon, UploadCloud } from "lucide-react";

//TODO: Add notifications
function ImageInput() {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
    } else {
      setError("Please upload a valid image file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const startCamera = async () => {
    setImage(null);
    setIsCameraOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setError("");
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Error accessing camera");
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current && isCameraOn) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, 640, 480);
      const dataURL = canvasRef.current.toDataURL("image/png");
      setImage(dataURL);
      stopCamera();
    } else {
      setError("Please start the camera first");
    }
  };

  const stopCamera = () => {
    setIsCameraOn(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const submitImage = () => {
    if (image) {
      //TODO: Submit image to server
      console.log("Image submitted:", image);
      setError("");
    } else {
      setError("Please capture an image first");
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-800">
          Upload or Capture Image
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-center items-center flex-col gap-4">
          <Input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={imageInputRef}
            onChange={handleFileChange}
            className="w-full border-dashed border-2 border-gray-300 px-4 hover:bg-gray-100 transition duration-200"
          />

          <div className="w-full">
            <div className="flex w-full justify-around items-center gap-3 mt-3">
              <Button
                onClick={isCameraOn ? stopCamera : startCamera}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Camera className="h-5 w-5" />
                {isCameraOn ? "Stop Camera" : image ? "Retake" : "Start Camera"}
              </Button>

              <Button
                onClick={takePhoto}
                disabled={!isCameraOn}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ImageIcon className="h-5 w-5" />
                Capture
              </Button>
            </div>

            <div className="bg-zinc-100 mt-6 p-3 border border-dashed border-gray-300 rounded-lg">
              {image ? (
                <img
                  src={image}
                  alt="captured"
                  className="w-full rounded-lg max-h-64 object-contain"
                />
              ) : (
                isCameraOn && (
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full max-h-64 rounded-lg object-cover"
                  />
                )
              )}

              {!image && !isCameraOn && (
                <div
                  onClick={() => {
                    imageInputRef.current?.click();
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="w-full min-h-64 flex flex-col items-center justify-center text-gray-400 text-sm"
                >
                  <ImageIcon className="h-16 w-16 mb-2" /> {/* Icon */}
                  <span>Drag & Drop or Click to Upload</span>{" "}
                </div>
              )}
            </div>
            <canvas
              className="hidden"
              ref={canvasRef}
              width="640"
              height="480"
            ></canvas>

            {error && (
              <div className="text-center text-red-500 font-medium">
                *{error}*
              </div>
            )}

            <Button
              onClick={submitImage}
              className="w-full flex items-center justify-center gap-2 mt-4"
            >
              <UploadCloud className="h-5 w-5" />
              Submit Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ImageInput;
