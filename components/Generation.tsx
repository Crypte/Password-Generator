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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { passwordStrength } from "check-password-strength";
import CryptoJS from "crypto-js";
import { ArrowDown, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function Generation() {
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [pinSize, setPinSize] = useState("4");
  const [numberIteration, setNumberIteration] = useState("0");
  const { toast } = useToast();

  useEffect(() => {
    const generatePassword = () => {
      if (name && domain && secret) {
        const combinedString = `${name}${domain}${secret}${numberIteration}`;
        const hashedString = CryptoJS.SHA512(combinedString);
        const pinString = hashedString.toString(CryptoJS.enc.Hex);
        const PasswordString = hashedString.toString(CryptoJS.enc.Base64);
        const numericHash = pinString.replace(/\D/g, "");
        const finalPinSize = parseInt(pinSize);
        const pinCode = numericHash.substring(0, finalPinSize);
        setPassword(PasswordString.substring(0, 20));
        setPin(pinCode);
      } else {
        setPassword("");
        setPin("");
      }
    };

    generatePassword();
  }, [name, domain, secret, pinSize, numberIteration]);

  function copyToClipboard() {
    navigator.clipboard.writeText(password);
  }

  const handleValueChange = (value: string) => {
    setPinSize(value);
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
    <>
      <Tabs defaultValue="password" className="lg:max-w-[600px] relative">
        <div className="absolute z-[-1] w-full h-full rounded-2xl bg-gradient-to-tl from-purple-400 to-red-400 blur-3xl dark:opacity-40 opacity-60 left-1/2 transform -translate-x-1/2" />
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="pin">Pin</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password Generation</CardTitle>
              <CardDescription>
                Your password will be the first 20 caracters of the resulted
                hash encoded in Base64 of your name, the domain of the website
                and your secret code
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
                  <Progress
                    indicatorColor={progressColor}
                    value={progressValue}
                  />
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
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).select();
                      }}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
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
        </TabsContent>
        <TabsContent value="pin">
          <Card>
            <CardHeader>
              <CardTitle>Pin Generation</CardTitle>
              <CardDescription>
                Your pin will be the x first digits of the resulted hash encoded
                in Base64 of your name, the domain of the website and your
                secret code
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
                  <Progress
                    indicatorColor={progressColor}
                    value={progressValue}
                  />
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
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).select();
                      }}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
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
        </TabsContent>
      </Tabs>
    </>
  );
}
