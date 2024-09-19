import React from "react"
import './EditCategory.scss'
import { CustomDrawer } from "../../../components/CustomDrawer/CustomDrawer"
import { ICategory } from "../../../interfaces"

interface IEditCategoryProps {
  category: ICategory | null
  onClose: () => void
}

export const EditCategory: React.FC<IEditCategoryProps> = ({ category, onClose }) => {
  return (
    <CustomDrawer
      className="edit-category"
      size="large"
      isOpen={!!category}
      onClose={onClose}
    >
      {category?.label}
    </CustomDrawer>
  )
}