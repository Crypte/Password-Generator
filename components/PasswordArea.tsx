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
import { useToast } from "@/components/ui/use-toast";
import { passwordStrength } from "check-password-strength";
import CryptoJS from "crypto-js";
import { ArrowDown, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function PasswordArea() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

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
        <CardTitle>Password Generation</CardTitle>
        <CardDescription>
          Your password will be the first 20 caracters of the resulted hash
          encoded in Base64 of your name, the domain of the website and your
          secret code
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
            <Label htmlFor="result">Your password</Label>
            <div className="flex gap-2">
              <Input
                id="result"
                placeholder="Password computed"
                value={password}
                readOnly
                disabled={entropyvalue < 90 || password === ""}
              />
              <Button
                size={"icon"}
                className="p-3"
                disabled={entropyvalue < 90 || password === ""}
                onClick={() => {
                  copyToClipboard();
                  toast({
                    title: "Password copied to the clipboard",
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
