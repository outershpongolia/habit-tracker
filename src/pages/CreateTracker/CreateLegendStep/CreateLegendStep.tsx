import React, { useCallback, useContext } from 'react'
import './CreateLegendStep.scss'
import { EListType, List } from '../../../components/List/List'
import { Color } from 'antd/es/color-picker';
import { TrackerContext } from '../../../context/TrackerContext';

interface ICreateLegendStepProps {}

export const CreateLegendStep: React.FC<ICreateLegendStepProps> = () => {
  const { tracker, predefinedLegend } = useContext(TrackerContext)

  const handleChangeColor = useCallback((value: Color, hex: string) => {
    console.log({value}, {hex})
  }, [])

  return (
    <div className='create-legend-step'>
      <List
        title='selected'
        items={tracker.legend.selectedLegend}
        type={EListType.SELECTED}
      />
      <List
        title='predefined'
        items={predefinedLegend}
        type={EListType.PREDEFINED}
        onChange={handleChangeColor}
      />
      <List
        title='custom'
        items={tracker.legend.customLegend}
        type={EListType.CUSTOM}
        onChange={handleChangeColor}
      />
    </div>
  )
}