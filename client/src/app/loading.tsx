import React from 'react'

const loading = () => {
  return (
    <div className=" fixed left-0 top-0 bg-[#000000] w-full z-50 flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-t-transparent border-[#800020] rounded-full animate-spin" />
    </div>
  )
}

export default loading