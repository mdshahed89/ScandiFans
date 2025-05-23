import React, { Suspense } from 'react'
import PageContent from "./Content"

const page = () => {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}

export default page