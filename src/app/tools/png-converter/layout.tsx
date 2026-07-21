import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG Converter",
  description:
    "Convert your images to PNG format. Upload your image and download it as a PNG file.",
};

const PngConverterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default PngConverterLayout;
