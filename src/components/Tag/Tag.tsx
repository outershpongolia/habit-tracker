import React, { useCallback } from "react"
import './Tag.scss'
import { MdClose } from "react-icons/md"

interface ITagProps {
  value: string
  onRemove: (value: string) => void
}

export const Tag: React.FC<ITagProps> = ({ value, onRemove }) => {
  const handleRemove = useCallback(() => {
    onRemove(value)
  }, [onRemove, value])

  return (
    <div className="tag">
      {value}

      <MdClose
        className="tag__icon"
        onClick={handleRemove}
      />
    </div>
  )
}