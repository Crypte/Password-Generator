import { ReactNode } from "react";

interface H2Props {
  className?: string;
  children: ReactNode;
  id?: string;
}

export const H2 = ({ className, children }: H2Props) => {
  return (
    <h2
      className={`mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 w-fit ${className}`}
    >
      {children}
    </h2>
  );
};
