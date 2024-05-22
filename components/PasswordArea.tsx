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
import { passwordStrength } from "check-password-strength";
import CryptoJS from "crypto-js";
import { ArrowDown, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function PasswordArea() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const generatePassword = () => {
      if (name && domain && secret) {
        const combinedString = `${name}${domain}${secret}`;
        const hashedPassword = CryptoJS.SHA256(combinedString).toString(
          CryptoJS.enc.Base64
        );
        setPassword(hashedPassword.substring(0, 20));
      } else {
        setPassword("");
      }
    };

    generatePassword();
  }, [name, domain, secret]);

  function copyToClipboard() {
    navigator.clipboard.writeText(password);
  }

  const handleClick = () => {
    setIsClicked(true);
    copyToClipboard();

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  let entropyvalue = passwordStrength(secret).id * 25;
  let strongvalue = passwordStrength(secret).value;
  let progressValue = entropyvalue;

  let progressColor = "bg-red-500 transition-colors";
  if (progressValue >= 70) {
    progressColor = "bg-green-500";
  } else if (progressValue >= 30) {
    progressColor = "bg-orange-500";
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate your password</CardTitle>
        <CardDescription>
          The pin is generated from the combination of your name, the domain of
          the website and your secret code. Your password will be the resulted
          hash encoded in Base64
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-6">
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
            <Label htmlFor="secret">{strongvalue}</Label>
          </div>
          <div className="w-full flex justify-center items-center">
            <ArrowDown className="w-4 h-4" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="result">Your password</Label>
            <div className="flex gap-2">
              <Input
                id="result"
                placeholder="Password computed"
                value={password}
                readOnly
                disabled={entropyvalue < 70 || password === ""}
              />
              <Button
                size={"icon"}
                className="p-3"
                onClick={handleClick}
                disabled={entropyvalue < 70 || password === ""}
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
