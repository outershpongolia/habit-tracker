import React, { useCallback, useMemo, useState } from "react"
import './TrackerCell.scss'
import clsx from "clsx"
import { MenuProps } from "antd"
import { CustomDropdown } from "../../CustomDropdown/CustomDropdown"

interface ITrackerCellProps {
  id?: string
  label?: string
  color?: string
  onClick?: (id: string) => void
}

export const TrackerCell: React.FC<ITrackerCellProps> = ({ id, label, color, onClick }) => {
  const [ cellColor, setCellColor ] = useState('')

  const handleOnClick = useCallback(() => {
    if (onClick && id) {
      onClick(id)
    }
  }, [onClick, id])

  const handleChangeColor = useCallback((color: string) => {
    return () => {
      setCellColor(color)
    }
  }, [])

  const generateDropdownItems = useMemo(() => {
    const legend: MenuProps['items'] = [
      {
        key: 'blue-color-legend',
        onClick: handleChangeColor('#125ab9'),
        label: 'Blue'
      },
      {
        key: 'orange-color-legend',
        onClick: handleChangeColor('#cc7708'),
        label: 'Orange'
      },
      {
        key: 'green-color-legend',
        onClick: handleChangeColor('green'),
        label: 'Green'
      }
    ]

    return legend
  }, [handleChangeColor])

  return (
    <CustomDropdown
      className="tracker-cell__wrapper"
      items={generateDropdownItems}
      disabled={!id}
    >
      <div
        className={clsx("tracker-cell",
          id && "tracker-cell_clickable"
        )}
        id={id}
        onClick={handleOnClick}
        style={{
          backgroundColor: id && cellColor
        }}
      >
        {label}
      </div>
    </CustomDropdown>
  )
}