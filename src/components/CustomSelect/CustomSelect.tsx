import React from "react"
import './CustomSelect.scss'
import { Select } from "antd"
import clsx from "clsx"

interface ICustomSelectProps {
  options: ISelectOption[]
  onChange: (value: string, option: ISelectOption | ISelectOption[]) => void
  defaultValue?: string
  placeholder?: string
  className?: string
}

export interface ISelectOption {
  value: string
  label: string
}

export const CustomSelect: React.FC<ICustomSelectProps> = ({ options, placeholder, onChange, defaultValue, className }) => {
  return (
    <Select
      className={clsx('custom-select', className)}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      style={{minWidth: '160px'}}
      defaultValue={defaultValue}
      showSearch
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
    />
  )
}