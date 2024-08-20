import React from "react"
import './CategoryListItem.scss'

interface ICategoryListItemProps {
  value: string
}

export const CategoryListItem: React.FC<ICategoryListItemProps> = ({ value }) => {
  return (
    <div className="category-list-item">
      {value}

      x
    </div>
  )
}