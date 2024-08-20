import React, { PropsWithChildren } from "react"
import './DashboardList.scss'
import { Loader } from "../../../components/Loader/Loader"
import clsx from "clsx"

interface IDashboardListProps extends PropsWithChildren {
  title: string
  listItems: React.ReactNode
  isLoading: boolean
  className?: string
}

export const DashboardList: React.FC<IDashboardListProps> = ({ title, listItems, isLoading, className, children }) => {
  return (
    <div className={clsx("dashboard-list", "white-container", className)}>
      <div className="dashboard-list__header">
        <div className="dashboard-list__title">{title}</div>

        <div style={{display: 'flex', gap: '14px'}}>
          {children}
        </div>
      </div>

      <div className="dashboard-list__list">
        {isLoading
          ? <Loader />
          : listItems
        }
      </div>
    </div>
  )
}