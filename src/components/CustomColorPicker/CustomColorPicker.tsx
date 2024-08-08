import React from "react"
import './CustomColorPicker.scss'
import { ColorPicker } from "antd"
import { Color } from "antd/es/color-picker"

interface ICustomColorPickerProps {
  color: string
  onChange: (value: Color, hex: string) => void
}

export const CustomColorPicker: React.FC<ICustomColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="custom-color-picker">
      Change color

      <ColorPicker
        defaultValue={color}
        onChange={onChange}
      />
    </div>
  )
}