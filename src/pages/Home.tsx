import { useState } from "react";
import ImageInput from "@/components/ImageInput";
import { ReportT } from "@/types";

const Home = () => {
  const [report, setReport] = useState<ReportT | null>(null);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ImageInput setReport={(report: ReportT | null) => setReport(report)} />
    </div>
  );
};

export default Home;
