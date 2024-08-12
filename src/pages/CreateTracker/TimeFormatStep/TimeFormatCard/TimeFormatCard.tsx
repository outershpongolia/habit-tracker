import React, { useCallback } from "react"
import './TimeFormatCard.scss'
import { ETimeFormat } from "../../../../constants"
import clsx from "clsx"

interface ITimeFormatCardProps {
  label: string
  timeFormat: ETimeFormat
  isActive: boolean
  onClick: (timeFormat: ETimeFormat) => void
}

export const TimeFormatCard: React.FC<ITimeFormatCardProps> = ({ label, timeFormat, isActive, onClick }) => {
  const handleOnClick = useCallback(() => {
    onClick(timeFormat)
  }, [onClick, timeFormat])

  return (
    <div
      className={clsx("time-format-card", isActive && "time-format-card_active")}
      onClick={handleOnClick}
    >
      {label}
    </div>
  )
}