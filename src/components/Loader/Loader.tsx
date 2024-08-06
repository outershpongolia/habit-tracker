import React from "react"
import './Loader.scss'

interface ILoaderProps {}

export const Loader: React.FC<ILoaderProps> = () => {
  return (
    <div className="loader">
      {/* Loading... */}
      <div className="loader__icon" />
    </div>
  )
}