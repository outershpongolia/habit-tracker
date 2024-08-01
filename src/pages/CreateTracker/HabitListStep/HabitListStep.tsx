import React, { useCallback, useContext, useState } from "react"
import './HabitListStep.scss'
import { TrackerContext } from "../../../context/TrackerContext"
import { Input } from "../../../components/Input/Input"
import { Button } from "../../../components/Button/Button"
import { Tag } from "../../../components/Tag/Tag"
import { EStatus, ETimeFormat } from "../../../constants"
import { AlertContext } from "../../../context/AlertContext"

interface IHabitListStepProps {}

export const HabitListStep: React.FC<IHabitListStepProps> = () => {
  const {tracker, setTracker} = useContext(TrackerContext)
  const {handleToast} = useContext(AlertContext)

  const [habit, setHabit] = useState('')

  const handleChangeInput = useCallback((value: string, name: string) => {
    setHabit(value)
  }, [])

  const handleAddHabit = useCallback(() => {
    setTracker(tracker => {
      if (tracker.timeFormat === ETimeFormat.WEEK && tracker.habits.length === 5) {
        handleToast(EStatus.ERROR, 'You can add max 5 elements to your list')
        return tracker
      }

      else if (tracker.timeFormat !== ETimeFormat.WEEK && tracker.habits.length === 1) {
        handleToast(EStatus.ERROR, 'You can add only one element to your list')
        return tracker
      }

      return {
        ...tracker,
        habits: [...tracker.habits, habit]
      }
    })

    setHabit('')
  }, [setTracker, habit, handleToast])

  const handleRemoveHabit = useCallback((value: string) => {
    setTracker(tracker => {
      return {
        ...tracker,
        habits: tracker.habits.filter(x => x !== value)
      }
    })
  }, [setTracker])

  return (
    <div className="third-step">
      <div className="third-step__title">
        What habit would you like to track?
      </div>

      <div className="third-step__input-wrapper">
        <Input
          className="third-step__input"
          name='habits-to-track'
          value={habit.toLowerCase()}
          onChange={handleChangeInput}
          maxLength={10}
          autoFocus
          label='nesto'
        />

        <Button
          label="add"
          onClick={handleAddHabit}
        />
      </div>

      <div className="third-step__list">
        {tracker.habits?.map(habit => {
          return (
            <Tag
              value={habit}
              onRemove={handleRemoveHabit}
            />
          )
        })}
      </div>
    </div>
  )
}