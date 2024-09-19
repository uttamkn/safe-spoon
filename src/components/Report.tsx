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
      <div className="flex justify-center items-center space-x-2">
        {report.is_valid && report.ingredient_risks.length !== 0 ? (
          report.is_safe ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-green-500 w-full h-full" />
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
          <div className="flex flex-col items-center h-full w-full">
            <XCircle className="text-red-500 w-full h-full" />
            <p className="text-3xl text-red-500 font-semibold">Invalid input</p>
          </div>
        )}
      </div>

      {report.is_valid && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {report.ingredient_risks.map((risk, index) => (
            <IngredientCard key={index} risk={risk} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Report;
