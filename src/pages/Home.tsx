import { useState } from "react";
import ImageInput from "@/components/ImageInput";
import Report from "@/components/Report";
import { ReportT } from "@/types";
import ModeToggle from "@/components/ModeToggle";

const Home = () => {
  const [report, setReport] = useState<ReportT | null>(null);

  return (
    <div className="flex h-screen w-screen bg-white dark:bg-zinc-900">
      <ModeToggle />
      <div className="flex h-full w-2/5 items-center justify-center p-6">
        <ImageInput setReport={(report: ReportT | null) => setReport(report)} />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between p-6">
        {report === null ? (
          <p className="text-2xl">No report to display</p>
        ) : (
          <Report report={report} />
        )}
        <div className="flex items-center justify-center">Disclaimer</div>
      </div>
    </div>
  );
};

export default Home;
