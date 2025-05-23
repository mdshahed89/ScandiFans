import React, { Suspense } from "react";
import PageContent from "./Content"; // 👈 move logic to this file

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
    <PageContent />
    </Suspense>
  );
}