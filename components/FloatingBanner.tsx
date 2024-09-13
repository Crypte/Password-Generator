"use client";

import { useScopedI18n } from "@/app/locales/client";
import { CircleAlert, XIcon } from "lucide-react";
import { useRef } from "react";

export const FloatingBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const scopew = useScopedI18n("warning");

  const handleDismiss = () => {
    if (bannerRef.current) {
      bannerRef.current.classList.add("hidden");
    }
  };

  return (
    <div
      ref={bannerRef}
      className="flex py-3 items-center justify-between gap-4 bg-gradient-to-tr from-[#1B3B7C] to-[#3d67bc] px-4 text-white rounded-lg max-lg:hidden"
    >
      <CircleAlert color="#FFA500" className="h-8 w-8" />
      <p className="text-sm font-medium text-center">
        {scopew("message")}: {""}
        <a
          href="https://password-generator-seven-lac.vercel.app/"
          className="inline-block underline"
        >
          https://password-generator-seven-lac.vercel.app/
        </a>
      </p>

      <button
        aria-label="Dismiss"
        className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
        onClick={handleDismiss}
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
