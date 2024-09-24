import { useState } from "react";
import ImageInput from "@/components/ImageInput";
import Report from "@/components/Report";
import { ReportT } from "@/types";
import LoadingAnimation from "@/components/LoadingAnimation";

const Home = () => {
  const [report, setReport] = useState<ReportT | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-full min-w-full border-t bg-white dark:border-border dark:bg-primary">
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex h-full w-full items-center justify-center border-b p-6 dark:border-border md:w-2/5 md:border-b-0 md:border-r">
          <ImageInput
            setReport={(report: ReportT | null) => setReport(report)}
            setLoading={(isLoading: boolean) => setLoading(isLoading)}
          />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center p-6">
          {loading ? (
            <LoadingAnimation />
          ) : report === null ? (
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
                No report to display
              </h2>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Upload an image to generate a report.
              </p>
            </div>
          ) : (
            <div className="h-full w-full">
              <Report report={report} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
