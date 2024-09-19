import React, { useCallback } from "react"
import './CategoryListItem.scss'
import { Button } from "../../../components/Button/Button"

interface ICategoryListItemProps {
  id: string
  label: string
  onEditCategory: (id: string) => void
  onRemoveCategory: (id: string) => void
  description?: string
}

export const CategoryListItem: React.FC<ICategoryListItemProps> = ({ id, label, onEditCategory, onRemoveCategory, description }) => {
  const handleEdit = useCallback(() => {
    onEditCategory(id)
  }, [onEditCategory, id])

  const handleRemove = useCallback(() => {
    onRemoveCategory(id)
  }, [onRemoveCategory, id])

  return (
    <div className="category-list-item">
      <div className="category-list-item__main">
        <div className="category-list-item__title">
          {label}
        </div>

        {description &&
          <div className="text-description">
            {description}
          </div>
        }
      </div>

      <div className="category-list-item__buttons">
        <Button
          label='edit'
          variety="secondary"
          onClick={handleEdit}
        />
        <Button
          className="category-list-item__button"
          label='remove'
          variety="secondary"
          onClick={handleRemove}
        />
      </div>
    </div>
  )
}