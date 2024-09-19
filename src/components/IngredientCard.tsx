import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IngredientRisk } from "@/types";
import { FC } from "react";

type IngredientCardProps = {
  risk: IngredientRisk;
};

const IngredientCard: FC<IngredientCardProps> = ({ risk }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-bold">{risk.ingredient}</h2>
        <Badge variant={risk.is_safe ? "default" : "destructive"}>
          {risk.is_safe ? "Safe" : "Risky"}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>
          Risk Level:{" "}
          <Badge variant={getRiskLevelBadgeVariant(risk.risk_level)}>
            {capitalizeFirstLetter(risk.risk_level)}
          </Badge>
        </p>
        <p>{risk.reason}</p>
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
