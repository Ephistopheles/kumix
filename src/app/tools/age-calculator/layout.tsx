import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator",
  description:
    "Calculate your age based on your date of birth. Enter your birth date to find out your exact age.",
};

const AgeCalculatorLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default AgeCalculatorLayout;
