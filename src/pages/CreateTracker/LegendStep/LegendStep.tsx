import React, { useContext } from 'react'
import './LegendStep.scss'
import { ELegendListType, LegendList } from './LegendList/LegendList'
import { TrackerContext } from '../../../context/TrackerContext';

interface ILegendStepProps {}

export const LegendStep: React.FC<ILegendStepProps> = () => {
  const { currentTracker, predefinedLegend } = useContext(TrackerContext)

  return (
    <div className='create-legend-step'>
      <LegendList
        title='selected'
        items={currentTracker.legend.filter(x => x.selected)}
        type={ELegendListType.SELECTED}
      />
      <LegendList
        title='predefined'
        items={predefinedLegend}
        type={ELegendListType.PREDEFINED}
      />
      <LegendList
        title='custom'
        items={currentTracker.legend.filter(x => !x.selected)}
        type={ELegendListType.CUSTOM}
      />
    </div>
  )
}