import React, { useContext } from 'react'
import './LegendStep.scss'
import { EListType, List } from '../../../components/List/List'
import { TrackerContext } from '../../../context/TrackerContext';

interface ILegendStepProps {}

export const LegendStep: React.FC<ILegendStepProps> = () => {
  const { currentTracker, predefinedLegend } = useContext(TrackerContext)

  return (
    <div className='create-legend-step'>
      <List
        title='selected'
        items={currentTracker.legend.filter(x => x.selected)}
        type={EListType.SELECTED}
      />
      <List
        title='predefined'
        items={predefinedLegend}
        type={EListType.PREDEFINED}
      />
      <List
        title='custom'
        items={currentTracker.legend.filter(x => !x.selected)}
        type={EListType.CUSTOM}
      />
    </div>
  )
}