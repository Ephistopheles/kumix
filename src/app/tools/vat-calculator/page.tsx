import { ToolLayout } from "@/shared/ui";
import { VatCalculator } from "@/features/calculator";

export default function VatCalculatorPage() {
  return (
    <ToolLayout
      title="VAT Calculator"
      description="Calculate VAT quickly. Add or remove VAT from any amount with a custom percentage."
      breadcrumbs={[{ label: "Calculators" }, { label: "VAT Calculator" }]}
      slug="vat-calculator"
    >
      <VatCalculator />
    </ToolLayout>
  );
}
