import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ImageInput() {
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, 640, 480);
      const dataURL = canvasRef.current.toDataURL("image/png");
      setImage(dataURL);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-6 space-y-6 bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold">
          Image Input
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h2 className="text-gray-700 font-medium mb-2">Upload from Files</h2>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="space-y-4">
          <h2 className="text-gray-700 font-medium mb-2">
            Capture from Camera
          </h2>
          <Button onClick={startCamera} className="w-full">
            Start Camera
          </Button>

          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              className="w-full max-w-full border rounded-lg"
              style={{ width: "640px", height: "480px" }}
            ></video>
            <Button onClick={takePhoto} className="mt-2 w-full">
              Capture Photo
            </Button>
          </div>
        </div>

        <canvas
          className="hidden"
          ref={canvasRef}
          width="640"
          height="480"
        ></canvas>

        {image && (
          <div className="mt-4">
            <h3 className="text-gray-700 font-medium mb-2">Preview:</h3>
            <img
              src={image}
              alt="Preview"
              className="border border-gray-300 rounded-lg w-full max-w-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ImageInput;
