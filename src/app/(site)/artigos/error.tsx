"use client";

import { ContentLoadError } from "@/components/ui/content-load-error";

export default function ArticlesError({ reset }: { reset: () => void }) {
  return <ContentLoadError reset={reset} />;
}
