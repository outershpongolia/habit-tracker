import React, { useCallback } from "react"
import './LegendListItem.scss'
import { Color } from "antd/es/color-picker"
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { ELegendListType } from "../LegendList/LegendList";
import { CustomColorPicker } from "../../../../components/CustomColorPicker/CustomColorPicker";

interface ILegendListItemProps {
  id: string
  status: string
  color: string
  type: ELegendListType
  handleSelectOption?: (id: string) => void
  handleRemoveOption?: (id: string, type: ELegendListType) => void
  handleChangeColor: (hex: string, id: string) => void
}

export const LegendListItem: React.FC<ILegendListItemProps> = ({ id, status, color, type, handleSelectOption, handleRemoveOption, handleChangeColor }) => {
  const onSelectOption = useCallback(() => {
    if (handleSelectOption) {
      handleSelectOption(id)
    }
  }, [handleSelectOption, id])

  const onRemoveOption = useCallback(() => {
    if (handleRemoveOption) {
      handleRemoveOption(id, type)
    }
  }, [handleRemoveOption, id, type])

  const onChangeColor = useCallback((_: Color, hex: string) => {
    handleChangeColor(hex, id)
  }, [handleChangeColor, id])

  return (
    <div
      className="legend-list-item"
    >
      <div className="legend-list-item__icons">
        {type !== ELegendListType.SELECTED &&
          <CiCirclePlus className='legend-list-item__icon' onClick={onSelectOption} />
        }

        {type !== ELegendListType.PREDEFINED &&
          <CiCircleMinus className='legend-list-item__icon' onClick={onRemoveOption} />
        }
      </div>

      {status}

      <CustomColorPicker
        color={color}
        onChange={onChangeColor}
      />
    </div>
  )
}