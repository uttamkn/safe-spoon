export type UserT = {
  username: string;
  password: string;
  email: string;
  allergies: string[];
  gender: string;
  age: number;
  weight: number;
  diseases: string[];
};

export type ReportT = {
  is_valid: boolean;
  is_safe: boolean;
  ingredient_risks: IngredientRisk[];
};

export type IngredientRisk = {
  ingredient: string;
  is_safe: boolean;
  risk_level: "low" | "moderate" | "high";
  reason: string;
};
