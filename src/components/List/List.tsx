import React, { useCallback, useContext, useState } from "react"
import './List.scss'
import { ListItem } from "./ListItem/ListItem"
import { Color } from "antd/es/color-picker"
import { Button } from "../Button/Button"
import { Popup } from "../Popup/Popup"
import { Input } from "../Input/Input"
import { TrackerContext } from "../../context/TrackerContext"
import { v4 } from "uuid"
import { FiPlus } from "react-icons/fi";
import { ILegend } from "../../interfaces"
import { CustomColorPicker } from "../CustomColorPicker/CustomColorPicker"

interface IListProps {
  title: string
  items: ILegend[]
  type: EListType
  onChange?: (value: Color, hex: string) => void
}

export enum EListType {
  SELECTED = 'selected',
  PREDEFINED = 'predefined',
  CUSTOM = 'custom'
}

export const List: React.FC<IListProps> = ({ title, items, type, onChange }) => {
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

  const handleDeleteCustomOption = useCallback((id: string, type: EListType) => {
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
    <div className="list">
      <div className="list__header">
        {title}
      </div>

      <div className="list__items">
        {type === EListType.CUSTOM &&
          <Button
            className="list__button"
            label="Add custom option"
            variety="secondary"
            icon={<FiPlus className="button-icon" />}
            onClick={handleOpenPopup}
          />
        }

        {items.map(item => {
          return (
            <ListItem
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
          <div className="list-popup__title">Add custom option</div>

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

          <div className="list-popup__buttons">
            <Button
              className="list-popup__button"
              label="Add"
              onClick={handleAddCustomOption}
              isDisabled={!customOption.status || !customOption.color}
            />
            <Button
              className="list-popup__button"
              label="Cancel" 
              onClick={handleClosePopup}
            />
          </div>
        </Popup>
      }
    </div>
  )
}