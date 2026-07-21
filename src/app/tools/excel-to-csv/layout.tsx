import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel to CSV",
  description:
    "Convert your Excel files to CSV format. Upload your Excel file and download it as a CSV file.",
};

const ExcelToCsvLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ExcelToCsvLayout;
