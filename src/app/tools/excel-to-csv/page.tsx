import { ToolLayout } from "@/shared/ui";
import { ExcelToCsv } from "@/features/excel";

export default function ExcelToCsvPage() {
  return (
    <ToolLayout
      title="Excel to CSV"
      description="Convert Excel spreadsheets to CSV format. Select a worksheet, preview the output and download."
      breadcrumbs={[{ label: "Excel" }, { label: "Excel to CSV" }]}
      slug="excel-to-csv"
    >
      <ExcelToCsv />
    </ToolLayout>
  );
}
