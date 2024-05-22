import React, { ReactNode } from "react";

interface H4Props {
  className?: string;
  children: ReactNode;
  id?: string;
}

export const H4 = ({ className, children }: H4Props) => {
  return (
    <h3
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};
