import React, { Suspense } from "react";
import PageContent from "./Content";
import { PageLoading } from "@/utils/Loading";

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
    <PageContent />
    </Suspense>
  );
}