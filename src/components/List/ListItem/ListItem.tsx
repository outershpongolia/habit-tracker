import React, { useCallback } from "react"
import './ListItem.scss'
import { Color } from "antd/es/color-picker"
import { EListType } from "../List"
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { CustomColorPicker } from "../../CustomColorPicker/CustomColorPicker"

interface IListItemProps {
  id: string
  status: string
  color: string
  type: EListType
  handleSelectOption?: (id: string) => void
  handleRemoveOption?: (id: string, type: EListType) => void
  handleChangeColor: (hex: string, id: string) => void
}

export const ListItem: React.FC<IListItemProps> = ({ id, status, color, type, handleSelectOption, handleRemoveOption, handleChangeColor }) => {
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
      className="list-item"
    >
      <div className="list-item__icons">
        {type !== EListType.SELECTED &&
          <CiCirclePlus className='list-item__icon' onClick={onSelectOption} />
        }

        {type !== EListType.PREDEFINED &&
          <CiCircleMinus className='list-item__icon' onClick={onRemoveOption} />
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