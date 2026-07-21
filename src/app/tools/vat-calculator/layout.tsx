import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAT Calculator",
  description:
    "Calculate VAT for your products. Enter the price and VAT rate to get the total amount.",
};

const VatCalculatorLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default VatCalculatorLayout;
