import { Menu, Package2 } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FloatingBanner } from "./FloatingBanner";
import { ThemeSwitch } from "./Theme-switch";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Navbar = () => {
  return (
    <>
      <FloatingBanner />
      <header className="sticky top-0 flex h-16 items-center gap-4 px-4 md:px-6 justify-between z-50">
        <div className=" md:container flex justify-between items-center">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span>
              Local.gen<Badge className="ml-2">V1</Badge>
            </span>
          </Link>

          <div className="md:flex space-x-1 items-center hidden">
            <Button asChild>
              <Link href="/info">How it's works ?</Link>
            </Button>
            <Button variant={"ghost"} size={"icon"} asChild>
              <Link href="/twitter" target="blank">
                <FaXTwitter className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant={"ghost"} size={"icon"} asChild>
              <Link
                href="https://github.com/Crypte/Password-Generator"
                target="blank"
              >
                <FaGithub className="w-4 h-4" />{" "}
              </Link>
            </Button>
            <ThemeSwitch />
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};
