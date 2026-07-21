import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to Excel",
  description:
    "Convert your CSV files to Excel format. Upload your CSV and download it as an Excel file.",
};

const CsvToExcelLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default CsvToExcelLayout;
