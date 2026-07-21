import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF",
  description:
    "Split your PDF files into separate pages. Upload your PDF file and download the individual pages.",
};

const SplitPdfLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default SplitPdfLayout;
