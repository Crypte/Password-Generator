"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/components/ui/use-toast";
import { passwordStrength } from "check-password-strength";
import CryptoJS from "crypto-js";
import { ArrowDown, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";

export function PinArea() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [secret, setSecret] = useState("");
  const [pin, setPin] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [pinSize, setPinSize] = useState("4");
  const { toast } = useToast();

  useEffect(() => {
    const generatePIN = () => {
      if (name && domain && secret) {
        const combinedString = `${name}${domain}${secret}`;
        const hashedString = CryptoJS.SHA256(combinedString).toString();
        const numericHash = hashedString.replace(/\D/g, "");
        const finalPinSize = parseInt(pinSize);
        const pinCode = numericHash.substring(0, finalPinSize);
        setPin(pinCode);
      } else {
        setPin("");
      }
    };

    generatePIN();
  }, [name, domain, secret, pinSize]);

  function copyToClipboard() {
    navigator.clipboard.writeText(pin);
  }

  const handleValueChange = (value: string) => {
    setPinSize(value);
  };

  let entropyvalue = passwordStrength(secret).id * 33.33;
  console.log(entropyvalue);
  let strongvalue = passwordStrength(secret).value;
  let progressValue = entropyvalue;

  let progressColor = "bg-red-500";
  if (progressValue > 90) {
    progressColor = "bg-green-500";
  } else if (progressValue > 60) {
    progressColor = "bg-orange-500";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pin Generation</CardTitle>
        <CardDescription>
          Your pin will be the x first digits of the resulted hash encoded in
          Base64 of your name, the domain of the website and your secret code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-6">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="domain">Number of digits</Label>
            <ToggleGroup
              type="single"
              variant="outline"
              value={pinSize}
              onValueChange={handleValueChange}
              className="justify-start"
            >
              <ToggleGroupItem defaultChecked={true} value="4">
                4
              </ToggleGroupItem>
              <ToggleGroupItem value="6">6</ToggleGroupItem>
              <ToggleGroupItem value="8">8</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Eric Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="domain">The domain of the website</Label>
            <Input
              id="domain"
              placeholder="google.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="secret">Your secret code</Label>
            <Input
              id="secret"
              placeholder="Mysecret"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Progress indicatorColor={progressColor} value={progressValue} />
            {!secret && <Label htmlFor="secret"></Label>}
            {secret && (
              <Badge variant={"outline"} className="w-fit">
                {strongvalue}
              </Badge>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <ArrowDown className="w-4 h-4" />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="result">Your pin</Label>
            <div className="flex gap-2">
              <Input
                id="result"
                placeholder="Pin computed"
                value={pin}
                readOnly
                disabled={entropyvalue < 90 || pin === ""}
              />

              <Button
                size={"icon"}
                className="p-3"
                disabled={entropyvalue < 90 || pin === ""}
                onClick={() => {
                  copyToClipboard();
                  toast({
                    title: "Pin copied to the clipboard",
                    description: "Use it wisely!",
                    variant: "success",
                  });
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
