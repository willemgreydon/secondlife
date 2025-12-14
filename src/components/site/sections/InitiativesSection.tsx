"use client";
import InitiativesGrid from "./InitiativesGrid";

export default function InitiativesSection(props: any) {
  if (!props?.initiatives?.length) return null;
  return <InitiativesGrid {...props} />;
}
