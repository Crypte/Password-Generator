"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { passwordStrength } from "check-password-strength";
import CryptoJS from "crypto-js";
import { CircleUser, Copy, Globe, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import { FloatingBanner } from "./FloatingBanner";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Generation() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [secret, setSecret] = useState("");
  const [result, setResult] = useState("");
  const [type, setType] = useState("password");
  const { toast } = useToast();

  const generatePassword = () => {
    if (name && domain && secret && type) {
      const hashedString = CryptoJS.PBKDF2(secret, `${name}${domain}`, {
        keySize: 256 / 32,
        iterations: 100000,
      });
      const encodedHexString = hashedString.toString(CryptoJS.enc.Hex);
      const encodedBaseString = hashedString.toString(CryptoJS.enc.Base64);
      const numericHash = encodedHexString.replace(/\D/g, "");

      let generatedResult = "";
      if (type === "password") {
        generatedResult = encodedBaseString.slice(0, 20);
      } else if (type === "pin4") {
        generatedResult = numericHash.slice(0, 4);
      } else if (type === "pin6") {
        generatedResult = numericHash.slice(0, 6);
      } else if (type === "pin8") {
        generatedResult = numericHash.slice(0, 8);
      }
      setResult(generatedResult);
      copyToClipboard();
    }
  };

  useEffect(() => {
    setResult("");
  }, [name, domain, secret, type]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: `${
        type === "password" ? "Password" : "Pin"
      } copied to the clipboard`,
      description: "Use it wisely!",
      variant: "success",
    });
  };

  let entropyvalue = passwordStrength(secret).id * 33.33;
  let strongvalue = passwordStrength(secret).value;
  let progressValue = entropyvalue;

  let progressColor = "bg-red-500";
  if (progressValue > 90) {
    progressColor = "bg-green-500";
  } else if (progressValue > 60) {
    progressColor = "bg-orange-500";
  }

  return (
    <div className="relative ">
      <div className="absolute z-[-1] w-full h-full rounded-2xl bg-gradient-to-tl from-purple-600 to-red-400 blur-3xl dark:opacity-40 opacity-60 left-1/2 transform -translate-x-1/2" />
      <FloatingBanner />
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>Pass Generator</CardTitle>
          <CardDescription>
            Generate a credential based on your secret code, your name and the
            domain of the website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Type</Label>

              <Select
                defaultValue="password"
                onValueChange={(value) => setType(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="pin4">Pin 4 digits</SelectItem>
                    <SelectItem value="pin6">Pin 6 digits</SelectItem>
                    <SelectItem value="pin8">Pin 8 digits</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your Name</Label>

              <Input
                startIcon={CircleUser}
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
                startIcon={Globe}
                id="domain"
                placeholder="google.com"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                }}
                required
              ></Input>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="secret">Your secret code</Label>
              <Input
                startIcon={KeyRound}
                id="secret"
                placeholder="Y0urS3cret-c0de@"
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="secret">Result</Label>
              <div className="flex gap-2">
                <Input
                  className="overflow-ellipsis"
                  id="result"
                  placeholder="Complete to generate"
                  type="password"
                  startIcon={KeyRound}
                  value={result}
                  readOnly
                  disabled={entropyvalue < 90 || result === ""}
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).select();
                  }}
                />

                <Button
                  disabled={entropyvalue < 90 || result !== ""}
                  onClick={() => {
                    generatePassword();
                  }}
                >
                  Gen & Copy
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size={"icon"}
                        className="p-3"
                        disabled={entropyvalue < 90 || result === ""}
                        onClick={() => {
                          copyToClipboard();
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
