"use client";

import App from "@/components/App";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  const isCanvas = pathname?.startsWith("/canvas");

  return (
    <div className={isCanvas ? "" : "reset-non-canvas-styles"}>
      <App />
    </div>
  );
}
