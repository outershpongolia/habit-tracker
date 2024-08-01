import React, { useCallback, useContext, useState } from "react"
import './List.scss'
import { ILegendOptions } from "../../interfaces"
import { ListItem } from "./ListItem/ListItem"
import { Color } from "antd/es/color-picker"
import { Button } from "../Button/Button"
import { Popup } from "../Popup/Popup"
import { Input } from "../Input/Input"
import { TrackerContext } from "../../context/TrackerContext"
import { v4 } from "uuid"
import { FiPlus } from "react-icons/fi";

interface IListProps {
  title: string
  items: ILegendOptions[]
  type: EListType
  onChange?: (value: Color, hex: string) => void
}

export enum EListType {
  SELECTED = 'selected',
  PREDEFINED = 'predefined',
  CUSTOM = 'custom'
}

export const List: React.FC<IListProps> = ({ title, items, type, onChange }) => {
  const { setTracker, setPredefinedLegend } = useContext(TrackerContext)

  const [ isPopupOpened, setIsPopupOpened ] = useState(false)
  const [ customOption, setCustomOption ] = useState<ILegendOptions>({
    id: '',
    status: '',
    color: ''
  })

  const handleOpenPopup = useCallback(() => {
    setIsPopupOpened(true)
  }, [])

  const handleClosePopup = useCallback(() => {
    setIsPopupOpened(false)
  }, [])

  const handleChangePopupInput = useCallback((value: string, name: string) => {
    setCustomOption(customOption => {
      return {
        ...customOption,
        status: value
      }
    })
  }, [])

  const handleAddCustomOption = useCallback(() => {
    setTracker(tracker => {
     return {
      ...tracker,
      legend: {
        ...tracker.legend,
        customLegend: [
          ...tracker.legend.customLegend,
          {
            ...customOption,
            id: v4()
          }
        ]
      }
     } 
    })

    setIsPopupOpened(false)
    setCustomOption({
      id: '',
      status: '',
      color: ''
    })
  }, [setTracker, customOption])

  const handleDeleteCustomOption = useCallback((id: string, type: EListType) => {
    const targetSelectedOption = items.find(x => x.id === id)

    setTracker(tracker => {
      if (type === EListType.CUSTOM) {
        return {
          ...tracker,
          legend: {
            ...tracker.legend,
            customLegend: tracker.legend.customLegend.filter(x => x.id !== id)
          }
        }
      }

      if (targetSelectedOption) {
        return {
          ...tracker,
          legend: {
              ...tracker.legend,
              selectedLegend: tracker.legend.selectedLegend.filter(x => x.id !== id),
              customLegend: targetSelectedOption.predefined
              ? tracker.legend.customLegend
              : [
                ...tracker.legend.customLegend,
                targetSelectedOption
              ]
            }
        }
      }

      return tracker
    })

    if (type === EListType.SELECTED) {
      if (targetSelectedOption && targetSelectedOption.predefined) {
        setPredefinedLegend(predefinedLegend => {
          return [
            ...predefinedLegend,
            targetSelectedOption
          ]
        })
      }
    }
  }, [setTracker, setPredefinedLegend, items])

  const handleSelectCurrentOption = useCallback((id: string) => {
    const targetLegendOption = items.find(x => x.id === id)

    if (!targetLegendOption) return

    setTracker(tracker => {
      return {
        ...tracker,
        legend: {
          ...tracker.legend,
          selectedLegend: [
            ...tracker.legend.selectedLegend, targetLegendOption
          ],
          customLegend: tracker.legend.customLegend.filter(x => x.id !== id)
        }
      }
    })

    if (targetLegendOption.predefined) {
      setPredefinedLegend(predefinedLegend => predefinedLegend.filter(x => x.id !== id))
    }
  }, [setTracker, setPredefinedLegend, items])

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
              onChange={onChange}
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

          <div className="list-popup__buttons">
            <Button
              className="list-popup__button"
              label="Add"
              onClick={handleAddCustomOption}
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