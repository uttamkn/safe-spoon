import { useState, useRef, FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Camera,
  Image as ImageIcon,
  UploadCloud,
  CameraOff,
} from "lucide-react";
import { getReport } from "@/api/imageProcessing";
import { ReportT } from "@/types";

type ImageInputProps = {
  setReport: (report: ReportT | null) => void;
  setLoading: (isLoading: boolean) => void;
};

const ImageInput: FC<ImageInputProps> = ({ setReport, setLoading }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  //TODO: Replace toast with something else
  const submitImage = async () => {
    if (image) {
      setReport(null);
      setLoading(true);
      // toast("Image submitted successfully");
      const report: ReportT = await getReport(image);
      setImage(null);
      setReport(report);
      setLoading(false);
    } else {
      // toast("Please capture an image first");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };

      reader.readAsDataURL(file);
    }
    // toast("Image uploaded successfully");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      // toast("Image uploaded successfully");
    } else {
      // toast("Please upload a valid image file");
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
      // toast("Camera started successfully");
    } catch (err) {
      console.error("Error accessing camera:", err);
      // toast("Error accessing camera");
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current && isCameraOn) {
      const context = canvasRef.current.getContext("2d");
      context?.drawImage(videoRef.current, 0, 0, 640, 480);
      const dataURL = canvasRef.current.toDataURL("image/png");
      setImage(dataURL);
      stopCamera();
      // toast("Image captured successfully");
    } else {
      // toast("Please start the camera first");
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

  return (
    <Card className="w-full max-w-lg dark:border-border dark:bg-secondary">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Upload or Capture Image
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Hidden input for file upload */}
        <Input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Hidden canvas for capturing image */}
        <canvas
          className="hidden"
          ref={canvasRef}
          width="640"
          height="480"
        ></canvas>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full">
            <div className="mt-3 flex w-full items-center justify-around gap-3">
              <Button
                variant="green"
                onClick={
                  isCameraOn
                    ? stopCamera
                    : image
                      ? () => setImage(null)
                      : startCamera
                }
                className="flex flex-1 items-center justify-center gap-2"
              >
                {isCameraOn ? (
                  <CameraOff className="h-5 w-5" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
                {isCameraOn ? "Stop Camera" : image ? "Retake" : "Start Camera"}
              </Button>

              <Button
                variant="green"
                onClick={takePhoto}
                disabled={!isCameraOn}
                className="flex flex-1 items-center justify-center gap-2"
              >
                <ImageIcon className="h-5 w-5" />
                Capture
              </Button>
            </div>

            <div className="mt-6 rounded-lg border border-dashed border-gray-600 bg-gray-100 p-3 dark:border-border dark:bg-tertiary">
              {image ? (
                <img
                  src={image}
                  alt="captured"
                  className="max-h-64 w-full rounded-lg object-contain"
                />
              ) : (
                isCameraOn && (
                  <video
                    ref={videoRef}
                    autoPlay
                    className="max-h-64 w-full rounded-lg object-cover"
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
                  className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center text-sm dark:text-white"
                >
                  <ImageIcon className="mb-2 h-16 w-16" />
                  <span>Drag & Drop or Click to Upload</span>{" "}
                </div>
              )}
            </div>

            <Button
              variant="green"
              onClick={submitImage}
              className="mt-4 flex w-full items-center justify-center gap-2"
            >
              <UploadCloud className="h-5 w-5" />
              Submit Image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageInput;
