import { useState } from "react";
import ImageInput from "@/components/ImageInput";

const Home = () => {
  const [extractedText, setExtractedText] = useState<string | null>(null);
  console.log("extractedText", extractedText);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ImageInput
        setExtractedText={(text: string | null) => setExtractedText(text)}
      />
      {extractedText && (
        <div className="absolute top-0 left-0 bg-white p-4 m-4 rounded-lg">
          {extractedText}
        </div>
      )}
    </div>
  );
};

export default Home;
