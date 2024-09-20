import { useState } from "react";
import ImageInput from "@/components/ImageInput";
import Report from "@/components/Report";
import { ReportT } from "@/types";
import ModeToggle from "@/components/ModeToggle";

const Home = () => {
  const [report, setReport] = useState<ReportT | null>(null);

  return (
    //TODO: Move the ModeToggle component to the navbar
    <div className="dark:bg-primary relative flex h-screen w-screen flex-col bg-white md:flex-row">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>

      <div className="flex h-full w-full items-center justify-center border-b border-gray-300 p-6 dark:border-zinc-700 md:w-2/5 md:border-b-0 md:border-r">
        <ImageInput setReport={(report: ReportT | null) => setReport(report)} />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-between p-6">
        {report === null ? (
          <p className="text-center text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
            No report to display
          </p>
        ) : (
          <div className="h-full w-full max-w-4xl">
            <Report report={report} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
