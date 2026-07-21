import { ToolLayout } from "@/shared/ui";
import { AgeCalculator } from "@/features/calculator";

export default function AgeCalculatorPage() {
  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, hours and minutes."
      badge="new"
      breadcrumbs={[{ label: "Calculators" }, { label: "Age Calculator" }]}
      slug="age-calculator"
    >
      <AgeCalculator />
    </ToolLayout>
  );
}
