"use client";

import PolarisComponentPreview from "@/components/PolarisComponentPreview";

export default function CanvasPage({
  params: { componentName },
}: {
  params: { componentName: string };
}) {
  return <PolarisComponentPreview componentName={componentName} />;
}
