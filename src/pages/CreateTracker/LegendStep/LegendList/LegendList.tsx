import React, { useCallback, useContext, useState } from "react"
import './LegendList.scss'
import { Color } from "antd/es/color-picker"
import { Button } from "../../../../components/Button/Button"
import { Popup } from "../../../../components/Popup/Popup"
import { Input } from "../../../../components/Input/Input"
import { TrackerContext } from "../../../../context/TrackerContext"
import { v4 } from "uuid"
import { FiPlus } from "react-icons/fi";
import { ILegend } from "../../../../interfaces"
import { CustomColorPicker } from "../../../../components/CustomColorPicker/CustomColorPicker"
import { LegendListItem } from "../LegendListItem/LegendListItem"


interface ILegendListProps {
  title: string
  items: ILegend[]
  type: ELegendListType
  onChange?: (value: Color, hex: string) => void
}

export enum ELegendListType {
  SELECTED = 'selected',
  PREDEFINED = 'predefined',
  CUSTOM = 'custom'
}

export const LegendList: React.FC<ILegendListProps> = ({ title, items, type }) => {
  const { setCurrentTracker, setPredefinedLegend } = useContext(TrackerContext)

  const [ isPopupOpened, setIsPopupOpened ] = useState(false)
  const [ customOption, setCustomOption ] = useState<ILegend>({
    id: '',
    status: '',
    color: '',
    selected: false,
    predefined: false
  })

  const handleOpenPopup = useCallback(() => {
    setIsPopupOpened(true)
  }, [])

  const handleClosePopup = useCallback(() => {
    setIsPopupOpened(false)
  }, [])

  // popup input
  const handleChangePopupInput = useCallback((value: string, name: string) => {
    setCustomOption(customOption => {
      return {
        ...customOption,
        status: value
      }
    })
  }, [])

  // popup color
  const handleAddColor = useCallback((_: Color, hex: string) => {
    setCustomOption(customOption => {
      return {...customOption, color: hex}
    })
  }, [setCustomOption])

  const handleAddCustomOption = useCallback(() => {
    setCurrentTracker(tracker => {
     return {
      ...tracker,
      legend: [
        ...tracker.legend,
        {
          ...customOption,
          id: v4()
        }
      ]
     }
    })

    setIsPopupOpened(false)
    setCustomOption({
      id: '',
      status: '',
      color: '',
      selected: false,
      predefined: false
    })
  }, [setCurrentTracker, customOption])

  const handleDeleteCustomOption = useCallback((id: string, type: ELegendListType) => {
    const targetSelectedOption = items.find(x => x.id === id)

    if (!targetSelectedOption) return

    setCurrentTracker(tracker => {
      if (!targetSelectedOption.selected && !targetSelectedOption.predefined) {
        return {
          ...tracker,
          legend: tracker.legend.filter(x => x.id !== id)
        }
      }

      return {
        ...tracker,
        legend: targetSelectedOption.predefined
          ? tracker.legend.filter(x => x.id !== targetSelectedOption.id)
          : tracker.legend.map(x => x.id === targetSelectedOption.id ? {...x, selected: false} : x)
      }
    })

    if (targetSelectedOption.selected && targetSelectedOption.predefined) {
      setPredefinedLegend(predefinedLegend => [...predefinedLegend, targetSelectedOption])
    }
  }, [setCurrentTracker, setPredefinedLegend, items])

  const handleSelectCurrentOption = useCallback((id: string) => {
    const targetLegendOption = items.find(x => x.id === id)

    if (!targetLegendOption) return

    setCurrentTracker(tracker => {
      if (targetLegendOption.predefined) {
        return {
          ...tracker,
          legend: [
            ...tracker.legend,
            {
              ...targetLegendOption,
              selected: true
            }
          ]
        }
      }
      
      if (!targetLegendOption.predefined && !targetLegendOption.selected){
        return {
          ...tracker,
          legend: tracker.legend.map(x => x.id === targetLegendOption.id ? {...x, selected: true} : x)
        }
      }

      return tracker
    })

    if (targetLegendOption.predefined) {
      setPredefinedLegend(predefinedLegend => predefinedLegend.filter(x => x.id !== id))
    }
  }, [setCurrentTracker, setPredefinedLegend, items])

  const handleChangeColor = useCallback((hex: string, id: string) => {
    setCurrentTracker(tracker => {
      return {
        ...tracker,
        legend: tracker.legend.map(x => x.id === id ? {...x, color: hex} : x)
      }
    })
  }, [setCurrentTracker])

  return (
    <div className="legend-list">
      <div className="legend-list__header">
        {title}
      </div>

      <div className="legend-list__items">
        {type === ELegendListType.CUSTOM &&
          <Button
            className="legend-list__button"
            label="Add custom option"
            variety="secondary"
            icon={<FiPlus className="button-icon" />}
            onClick={handleOpenPopup}
          />
        }

        {items.map(item => {
          return (
            <LegendListItem
              key={item.id}
              id={item.id}
              status={item.status}
              color={item.color}
              type={type}
              handleChangeColor={handleChangeColor}
              handleRemoveOption={handleDeleteCustomOption}
              handleSelectOption={handleSelectCurrentOption}
            />
          )
        })}
      </div>

      {isPopupOpened &&
        <Popup>
          <div className="legend-list-popup__title">Add custom option</div>

          <Input
            value={customOption.status}
            name='option'
            onChange={handleChangePopupInput}
            label='option'
            autoFocus
          />

          <CustomColorPicker
            color={customOption.color}
            onChange={handleAddColor}
          />

          <div className="legend-list-popup__buttons">
            <Button
              className="legend-list-popup__button"
              label="Add"
              onClick={handleAddCustomOption}
              isDisabled={!customOption.status || !customOption.color}
            />
            <Button
              className="legend-list-popup__button"
              label="Cancel" 
              onClick={handleClosePopup}
            />
          </div>
        </Popup>
      }
    </div>
  )
}