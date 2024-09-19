import React from "react"
import './CustomSelect.scss'
import { Select, Space } from "antd"
import clsx from "clsx"

interface ICustomSelectProps {
  options: ISelectOption[]
  onChange: (value: any, option: ISelectOption | ISelectOption[]) => void
  value?: string | string[]
  defaultValue?: string
  placeholder?: string
  mode?: "multiple" | "tags" | undefined
  autoClearSearchValue?: boolean
  className?: string
}

export interface ISelectOption {
  value: string
  label: string
  disabled?: boolean
}

export const CustomSelect: React.FC<ICustomSelectProps> = ({
  placeholder,
  value,
  onChange,
  options,
  defaultValue,
  mode=undefined,
  autoClearSearchValue,
  className
}) => {
  return (
    <Space>
      <Select
      className={clsx('custom-select', className)}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      style={{minWidth: '160px'}}
      defaultValue={defaultValue}
      mode={mode}
      showSearch
      allowClear
      autoClearSearchValue={autoClearSearchValue}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
    </Space>
  )
}