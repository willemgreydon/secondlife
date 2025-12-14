"use client";

import dynamic from "next/dynamic";

/**
 * Client-only Sanity Studio wrapper.
 * We dynamically load the <Studio /> component
 * and intentionally cast types to avoid cross-node_modules conflicts.
 */

const Studio = dynamic(
  () =>
    import("sanity").then((mod) => {
      const StudioComponent = mod.Studio as any;
      const config = require("../../../sanity-studio/sanity.config").default;

      return function SanityStudio() {
        return <StudioComponent config={config} />;
      };
    }),
  { ssr: false }
);

export default function StudioClient() {
  return <Studio />;
}
