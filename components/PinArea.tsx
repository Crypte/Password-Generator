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
import CryptoJS from "crypto-js";
import { ArrowDown, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
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

  const handleClick = () => {
    setIsClicked(true);
    copyToClipboard();

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  const handleValueChange = (value: string) => {
    setPinSize(value);
  };

  const progressValue = secret.length * 5;
  let progressColor = "bg-red-500 transition-colors";

  if (progressValue > 70) {
    progressColor = "bg-green-500";
  } else if (progressValue > 30) {
    progressColor = "bg-orange-500";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate your pin</CardTitle>
        <CardDescription>
          The pin is generated from the combination of your name, the domain of
          the website and your secret code. The first 6 digits of the SHA256
          hash of this combination are used as the pin.
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
            <Label htmlFor="secret">Strong bar</Label>
            <Progress indicatorColor={progressColor} value={progressValue} />
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
              />
              <Button
                size={"icon"}
                className="p-3"
                onClick={handleClick}
                disabled={pin === ""}
              >
                {isClicked ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
