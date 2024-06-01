import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ThemeSwitch } from "./Theme-switch";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <>
      <header className="fixed w-full top-0 flex h-16 items-center gap-4 justify-between z-50 max-lg:backdrop-blur-2xl">
        <div className="container flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <span>
              Local.gen<Badge className="ml-2">V1</Badge>
            </span>
          </Link>

          <div className="flex space-x-1 items-center">
            <Button asChild>
              <Link href="/info">Docs</Link>
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
      </header>
    </>
  );
};
