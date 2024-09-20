import { FC } from "react";
import { ReportT } from "../types";
import { CheckCircle, XCircle } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import IngredientCard from "./IngredientCard";

type ReportProps = {
  report: ReportT;
};

const Report: FC<ReportProps> = ({ report }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-around">
      {report.is_valid && report.ingredient_risks.length !== 0 ? (
        report.is_safe ? (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-32 w-32 text-green-500 md:h-20 md:w-20" />
            <p className="text-3xl font-semibold text-green-600">
              Safe to consume
            </p>
          </div>
        ) : (
          <p className="text-3xl font-semibold text-yellow-600">
            Some ingredients are unsafe.
          </p>
        )
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <XCircle className="h-32 w-32 text-red-500 md:h-20 md:w-20" />
          <p className="text-3xl font-semibold text-red-600">Invalid input</p>
        </div>
      )}

      {report.is_valid && (
        <>
          <ScrollArea className="h-[300px] overflow-y-auto sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {report.ingredient_risks.map((risk, index) => (
                <IngredientCard key={index} risk={risk} />
              ))}
            </div>
          </ScrollArea>

          <div className="w-full max-w-4xl">
            <div className="mt-6 pt-4 text-center text-xs text-gray-500 dark:border-zinc-700 dark:text-gray-400 md:text-sm">
              <p className="italic">
                Disclaimer: The information provided in the report is based on
                the data you provided and is not intended as medical advice.
                Always consult a healthcare provider for dietary
                recommendations.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
