import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "XML Formatter",
  description:
    "Format your XML files. Paste your XML code and get a well-formatted version.",
};

const XmlFormatterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default XmlFormatterLayout;
