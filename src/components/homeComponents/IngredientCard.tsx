import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IngredientRisk } from "@/types";
import { FC } from "react";

type IngredientCardProps = {
  risk: IngredientRisk;
};

const IngredientCard: FC<IngredientCardProps> = ({ risk }) => {
  return (
    <Card className="flex flex-col gap-2 dark:bg-tertiary">
      <CardHeader className="flex h-1/2 flex-col justify-between">
        <h2 className="flex font-bold">{risk.ingredient}</h2>
        <Badge variant={risk.is_safe ? "safe" : "destructive"}>
          {risk.is_safe ? "Safe" : "Risky"}
        </Badge>
      </CardHeader>
      <CardContent className="flex h-1/2 flex-col justify-between">
        <div>
          Risk Level:{" "}
          <Badge variant={getRiskLevelBadgeVariant(risk.risk_level)}>
            {capitalizeFirstLetter(risk.risk_level)}
          </Badge>
        </div>
        <div>{risk.reason}</div>
      </CardContent>
    </Card>
  );
};

const getRiskLevelBadgeVariant = (riskLevel: "low" | "moderate" | "high") => {
  switch (riskLevel) {
    case "low":
      return "secondary";
    case "moderate":
      return "outline";
    case "high":
      return "destructive";
  }
};

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default IngredientCard;
