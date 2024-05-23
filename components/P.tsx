import { ReactNode } from "react";

interface PProps {
  className?: string;
  children: ReactNode;
}

export const P = ({ className, children }: PProps) => {
  return (
    <p
      className={`md:leading-7 leading-6 [&:not(:first-child)]:mt-5 text-muted-foreground ${className}`}
    >
      {children}
    </p>
  );
};
