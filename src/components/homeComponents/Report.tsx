import { FC } from "react";
import { ReportT } from "../../types";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import IngredientCard from "./IngredientCard";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type ReportProps = {
  report: ReportT;
};

const Report: FC<ReportProps> = ({ report }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between gap-4">
      {report.is_valid && report.ingredient_risks.length !== 0 ? (
        report.is_safe ? (
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-16 w-16 text-green-500 md:h-32 md:w-32" />
            <p className="text-3xl font-semibold text-green-600">
              Safe to consume
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <AlertCircle className="h-16 w-16 text-yellow-500 md:h-32 md:w-32" />
            <p className="text-3xl font-semibold text-yellow-600">
              Some ingredients are unsafe.
            </p>
          </div>
        )
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <XCircle className="h-16 w-16 text-red-500 md:h-32 md:w-32" />
          <p className="text-3xl font-semibold text-red-600">
            Invalid input try submitting again.
          </p>
        </div>
      )}

      {report.is_valid && report.ingredient_risks.length !== 0 && (
        <>
          <ScrollArea className="h-[300px] overflow-y-auto rounded-md border p-6 dark:border-border dark:bg-secondary sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {report.ingredient_risks.map((risk, index) => (
                <IngredientCard key={index} risk={risk} />
              ))}
            </div>
          </ScrollArea>

          <Alert variant="warning" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
              The information provided in the report is based on the data you
              provided and is not intended as medical advice. Always consult a
              healthcare provider for dietary recommendations.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
};

export default Report;
