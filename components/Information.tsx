import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function Information() {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          The pin is generated from the combination of your name, the domain of
          the website and your secret code. The first 6 digits of the SHA256
          hash of this combination are used as the pin.
        </AlertDescription>
      </Alert>
    </div>
  );
}
