import { useState } from "react";
import ImageInput from "@/components/homeComponents/ImageInput";
import Report from "@/components/homeComponents/Report";
import NoReport from "@/components/errorComponents/NoReport";
import { ReportT } from "@/types";
import { Loader } from "lucide-react";

const HomePage = () => {
  const [report, setReport] = useState<ReportT | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-full min-w-full border-t bg-white font-roboto dark:border-border dark:bg-primary">
      <div className="flex flex-1 flex-col md:flex-row">
        <div className="flex h-full w-full items-center justify-center border-b p-6 dark:border-border md:w-2/5 md:border-b-0 md:border-r">
          <ImageInput
            setReport={(report: ReportT | null) => setReport(report)}
            setLoading={(isLoading: boolean) => setLoading(isLoading)}
          />
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center p-6">
          {loading ? (
            <div className="flex min-h-full items-center justify-center dark:bg-primary">
              <Loader size={64} className="animate-spin" />
            </div>
          ) : report === null ? (
            <NoReport />
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

export default HomePage;
