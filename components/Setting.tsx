import { AtSign, CaseLower, CaseUpper } from "lucide-react";
import { H2 } from "./H2";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function Setting() {
  return (
    <div className="space-y-4">
      <H2 className="mb-6">Settings</H2>
      <div className="space-y-1.5">
        <Label>Password lenght</Label>
        <Input type="number" />
      </div>

      <div className="space-y-1.5">
        <Label>Password characters</Label>
        <ToggleGroup className="justify-start" type="multiple">
          <ToggleGroupItem value="standart">
            <CaseLower className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="capital">
            <CaseUpper className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="number">
            <AtSign className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="special">
            <AtSign className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
