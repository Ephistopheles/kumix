import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF",
  description:
    "Merge multiple PDF files into a single document. Upload your PDF files and download the merged result.",
};

const MergePdfLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default MergePdfLayout;
