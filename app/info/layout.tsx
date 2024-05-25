import { NavbarDoc } from "@/components/NavbarDoc";

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarDoc />
      {children}
    </>
  );
}
