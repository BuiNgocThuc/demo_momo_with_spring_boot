import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const Overlay = ({ children }: Props) => {
  return (
    <div className="size-full fixed inset-0 bg-black/50 z-50 animate-in fade-in">
      <div className="size-full flex justify-center items-center">
        {children}
      </div>
    </div>
  )
}

export default Overlay
