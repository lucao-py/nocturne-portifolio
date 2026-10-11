"use client";

import { useMemo } from "react";
import { NextStudio } from "next-sanity/studio";
import { createSanityConfig } from "../../sanity.config";

type StudioProps = {
  projectId: string;
  dataset: string;
};

export function Studio({ projectId, dataset }: StudioProps) {
  const config = useMemo(() => createSanityConfig(projectId, dataset), [projectId, dataset]);
  return <NextStudio config={config} />;
}
