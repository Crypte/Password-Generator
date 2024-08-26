import { cn } from "@/lib/utils";
import { Eye, EyeOff, Lock, LucideIcon } from "lucide-react";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  urllogo?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, urllogo, ...props }, ref) => {
    const StartIcon = startIcon || React.Fragment;
    const EndIcon = endIcon;
    const [show, setShow] = React.useState(false);

    if (type === "password") {
      return (
        <div className="w-full relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <StartIcon size={18} className="text-muted-foreground" />
          </div>
          <input
            autoComplete="off"
            type={!show ? type : "text"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background py-2 px-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 pr-10",
              startIcon ? "pl-12" : "",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            type="button"
          >
            {show ? (
              <Eye className="text-muted-foreground" size={18} />
            ) : (
              <EyeOff className="text-muted-foreground" size={18} />
            )}
          </button>
        </div>
      );
    }

    return (
      <div className="w-full relative">
        {StartIcon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <StartIcon size={18} className="text-muted-foreground" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-12" : "",
            endIcon ? "pr-8" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <EndIcon className="text-muted-foreground" size={18} />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
