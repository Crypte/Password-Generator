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
import {
  CircleUser,
  Copy,
  Globe,
  KeyRound,
  Lock,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FloatingBanner } from "./FloatingBanner";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useI18n, useScopedI18n } from "../app/locales/client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Generation() {
  const t = useI18n();
  const scopeg = useScopedI18n("generator");

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [secret, setSecret] = useState("");
  const [count, setCount] = useState(1);
  const [result, setResult] = useState("");
  const [fieldcheck, setFieldcheck] = useState(false);
  const [type, setType] = useState("password");
  const { toast } = useToast();

  const generatePassword = () => {
    if (name && domain && secret && type) {
      const PBKDF2 = CryptoJS.PBKDF2(secret, `${name}${domain}`, {
        keySize: 256 / 32,
        iterations: 100000 + count,
      });
      const encodedHexString = PBKDF2.toString(CryptoJS.enc.Hex);
      const encodedBaseString = PBKDF2.toString(CryptoJS.enc.Base64);
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
      copyToClipboard(generatedResult);
    }
  };

  useEffect(() => {
    setResult("");
    if (name && domain && secret && type && count >= 0) {
      setFieldcheck(true);
    } else {
      setFieldcheck(false);
    }
  }, [name, domain, secret, type, count]);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast({
      title: `${
        type === "password" ? "Password" : "Pin"
      } copied to the clipboard`,
      description: "Use it wisely!",
      variant: "success",
    });
  }

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
    <div className="relative max-w-[550px] ">
      <div className=" dark:hidden absolute z-[-1] w-full h-full rounded-2xl bg-primary blur-3xl opacity-20 left-1/2 transform -translate-x-1/2 " />
      <FloatingBanner />
      <Card className="mt-3">
        <CardHeader>
          <CardTitle>{scopeg("title")}</CardTitle>
          <CardDescription>{scopeg("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center max-lg:gap-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type">{scopeg("type.label")}</Label>
                <Select
                  defaultValue="password"
                  onValueChange={(value) => setType(value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="password">
                        {scopeg("type.password")}
                      </SelectItem>
                      <SelectItem value="pin4">
                        {scopeg("type.pin4")}
                      </SelectItem>
                      <SelectItem value="pin6">
                        {scopeg("type.pin6")}
                      </SelectItem>
                      <SelectItem value="pin8">
                        {scopeg("type.pin8")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">{scopeg("count")}</Label>

                <Input
                  min={1}
                  className="w-[120px]"
                  type="number"
                  startIcon={RotateCcw}
                  id="count"
                  value={count}
                  onChange={(e) => {
                    setCount(parseInt(e.target.value));
                  }}
                  required
                ></Input>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name"> {scopeg("name.label")}</Label>

              <Input
                startIcon={CircleUser}
                id="name"
                placeholder={scopeg("name.placeholder")}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="domain">{scopeg("domain.label")}</Label>
              <Input
                startIcon={Globe}
                id="domain"
                placeholder={scopeg("domain.placeholder")}
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value.toLowerCase());
                }}
                required
              ></Input>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="secret">{scopeg("secret.label")}</Label>
              <Input
                startIcon={KeyRound}
                id="secret"
                placeholder={scopeg("secret.placeholder")}
                type="password"
                value={secret}
                onChange={(e) => {
                  setSecret(e.target.value);
                }}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Progress indicatorColor={progressColor} value={progressValue} />
              {!secret && (
                <Badge variant={"outline"} className="w-fit">
                  {scopeg("complexity.noinput")}
                </Badge>
              )}
              {secret && (
                <Badge variant={"outline"} className="w-fit">
                  {strongvalue} secret
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                className="w-full p-7 text-base"
                disabled={
                  entropyvalue < 90 || result !== "" || fieldcheck === false
                }
                onClick={() => {
                  generatePassword();
                }}
              >
                {scopeg("generate")}
              </Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="secret"> {scopeg("result.label")}</Label>
              <div className="flex gap-2">
                <Input
                  className="overflow-ellipsis"
                  id="result"
                  placeholder={scopeg("result.placeholder")}
                  type="password"
                  startIcon={Lock}
                  value={result}
                  readOnly
                  disabled={result === ""}
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
                        disabled={result === ""}
                        onClick={() => {
                          copyToClipboard(result);
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{scopeg("result.tooltip")}</TooltipContent>
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
