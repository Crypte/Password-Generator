import { Faq } from "./Faq";
import { H2 } from "./H2";

export function Sidebar() {
  return (
    <div className="space-y-4">
      <H2 className="mb-6">FAQ</H2>
      <Faq />
    </div>
  );
}
