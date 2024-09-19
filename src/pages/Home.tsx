import { useState } from "react";
import ImageInput from "@/components/ImageInput";
import Report from "@/components/Report";
import { ReportT } from "@/types";
import ModeToggle from "@/components/ModeToggle";

const Home = () => {
  const [report, setReport] = useState<ReportT | null>(null);

  return (
    <div className="h-screen w-screen flex bg-white dark:bg-zinc-900">
      <ModeToggle />
      <div className="p-6 h-full w-2/5 flex justify-center items-center">
        <ImageInput setReport={(report: ReportT | null) => setReport(report)} />
      </div>
      <div className="p-6 h-full w-full flex flex-col items-center justify-between">
        {report === null ? (
          <p className="text-2xl">No report to display</p>
        ) : (
          <Report report={report} />
        )}
        <div className="flex justify-center items-center">Disclaimer</div>
      </div>
    </div>
  );
};

export default Home;
