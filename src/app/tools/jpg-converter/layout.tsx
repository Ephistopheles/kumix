import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPG Converter",
  description:
    "Convert your JPG images to different formats. Upload your JPG file and download it in the desired format.",
};

const JpgConverterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default JpgConverterLayout;
