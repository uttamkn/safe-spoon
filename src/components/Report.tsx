import { FC } from "react";
import { ReportT } from "../types";
import { CheckCircle, XCircle } from "lucide-react";
import IngredientCard from "./IngredientCard";

type ReportProps = {
  report: ReportT;
};

const Report: FC<ReportProps> = ({ report }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center space-x-2">
        {report.is_valid && report.ingredient_risks.length !== 0 ? (
          report.is_safe ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-full w-full text-green-500" />
              <p className="text-3xl font-semibold text-green-600">
                Safe to consume
              </p>
            </div>
          ) : (
            <p className="text-lg font-semibold text-yellow-600">
              Some ingredients are unsafe.
            </p>
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center">
            <XCircle className="h-full w-full text-red-500" />
            <p className="text-3xl font-semibold text-red-500">Invalid input</p>
          </div>
        )}
      </div>

      {report.is_valid && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {report.ingredient_risks.map((risk, index) => (
            <IngredientCard key={index} risk={risk} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Report;
