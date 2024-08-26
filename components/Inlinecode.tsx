import { ReactNode } from "react";

interface InlineCodeProps {
  className?: string;
  children: ReactNode;
}

export const InlineCode = ({ className, children }: InlineCodeProps) => {
  return (
    <div className="mt-5">
      <code
        className={`rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className}`}
      >
        {children}
      </code>
    </div>
  );
};
