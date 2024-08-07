import React, { useCallback } from 'react'
import './DateSelect.scss'
import { ETimeFormat } from '../../constants'
import { Space, DatePicker } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { Dayjs } from 'dayjs'
import moment from 'moment'

interface IDateSelectProps {
  type: ETimeFormat
  values: [Dayjs, Dayjs]
  handleChangeDate: (dateRange: [string, string]) => void
}

export enum EDateLabel {
  START_DATE = 'startDate',
  END_DATE = 'endDate'
}

const { RangePicker } = DatePicker

export const DateSelect: React.FC<IDateSelectProps> = ({
  type,
  values,
  handleChangeDate
}) => {
  const onChangeDate = useCallback((_: any, dateStrings: [string, string]) => {
    handleChangeDate(dateStrings)
  }, [handleChangeDate])

  const disabledDate: RangePickerProps['disabledDate'] = useCallback((current: any) => {
    // can't select days before today
    return current && current < moment().startOf('day')
  }, [])

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        picker={type !== ETimeFormat.CUSTOM_DATE_RANGE ? type : undefined}
        placement='bottomLeft'
        onChange={onChangeDate}
        format="YYYY-MM-DD"
        disabledDate={disabledDate}
        showTime={{ hideDisabledOptions: true }}
        value={values}
      />
    </Space>
  )
}