import { ReactNode } from "react";

interface H1Props {
  className?: string;
  children: ReactNode;
}

export const H1 = ({ className, children }: H1Props) => {
  return (
    <h1
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`}
    >
      {children}
    </h1>
  );
};
