import React, { useCallback, useContext, useState } from "react"
import './Settings.scss'
import { Header } from "../../components/Header/Header"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"
import { CategoryListItem } from "./CategoryListItem/CategoryListItem"
import { UserContext } from "../../context/UserContext"
import { ICategory } from "../../interfaces"
import { DEFAULT_CATEGORY_OBJECT, EStatus, MAXIMUM_NUMBER_OF_CATEGORIES } from "../../constants"
import { v4 } from "uuid"
import { AlertContext } from "../../context/AlertContext"
import { EditCategory } from "./EditCategory/EditCategory"
import { updateUser } from "../../api/users"
import { useNavigate } from "react-router-dom"

interface ISettingsProps {}

export const Settings: React.FC<ISettingsProps> = () => {
  const {setUser, user} = useContext(UserContext)
  const {handleToast} = useContext(AlertContext)

  const [categoryInputValue, setCategoryInputValue] = useState<ICategory>(DEFAULT_CATEGORY_OBJECT)
  const [editCategory, setEditCategory] = useState<ICategory | null>(null)

  const navigate = useNavigate()

  const handleCategoryInput = useCallback((value: string, name: string) => {
    setCategoryInputValue(categoryInputValue => {
      if (name === "description") {
        return {
          ...categoryInputValue,
          description: value
        }
      } else {
        return {
          ...categoryInputValue,
          id: v4(),
          label: value,
          value: value.toLowerCase().replaceAll(" ", "")
        }
      }
    })
  }, [setCategoryInputValue])

  const handleAddCategory = useCallback(() => {
    setUser(user => {
      if (!user) return null

      if (user.categories.length === MAXIMUM_NUMBER_OF_CATEGORIES) {
        handleToast(EStatus.ERROR, 'You can have maximum 5 categories.')
        return user
      }

      const duplicate = user.categories.find(x => x.value === categoryInputValue.value)

      if (duplicate) {
        handleToast(EStatus.ERROR, "Category already exists.")
        return user
      } else {
        return {...user, categories: [...user.categories, categoryInputValue]}
      }
    })

    setCategoryInputValue(DEFAULT_CATEGORY_OBJECT)
  }, [setUser, categoryInputValue, handleToast])

  const handleOpenEditCategory = useCallback((id: string) => {
    const targetCategory = user?.categories.find(x => x.id === id)

    if (targetCategory) {
      setEditCategory(targetCategory)
    }
  }, [user, setEditCategory])

  const handleCloseDrawer = useCallback(() => {
    setEditCategory(null)
  }, [setEditCategory])

  const handleRemoveCategory = useCallback((id: string) => {
    setUser(user => {
      if (!user) return null

      return {
        ...user,
        categories: user.categories.filter(x => x.id !== id)
      }
    })
  }, [setUser])

  const handleSaveChanges = useCallback(() => {
    if (user) {
      updateUser(user)
        .then((res) => localStorage.setItem('user', JSON.stringify(res.data)))
        .catch(err => {
          throw new Error(err)
        })
        .finally(() => navigate(0))
    }
  }, [user, navigate])

  return (
    <div className="settings page">
      <Header label="Settings">
        <Button
          label="Save changes"
          onClick={handleSaveChanges}
        />
      </Header>

      <div className="settings__main">
        <div className="settings__input white-container">
          <div className="settings__title">
            Add category

            <div className="text-description">
              Create different categories so you can organize your trackers better
            </div>
          </div>

          <Input
            value={categoryInputValue.label}
            name="category"
            label="category"
            onChange={handleCategoryInput}
            info='You can have 5 categories in total.'
            maxLength={12}
          />

          <Input
            value={categoryInputValue.description}
            name="description"
            label="description (optional)"
            onChange={handleCategoryInput}
            maxLength={32}
          />

          <Button
            className="settings__button"
            label='Add category'
            onClick={handleAddCategory}
          />
        </div>

        <div className="settings__categories">
          <div className="settings__title">
            My categories

            <div className="text-description">
              List of all categories
            </div>
          </div>

          <div className="settings__list">
            {user?.categories && user.categories.map(x => {
              return (
                <CategoryListItem
                  key={x.id}
                  id={x.id}
                  label={x.label}
                  description={x.description}
                  onEditCategory={handleOpenEditCategory}
                  onRemoveCategory={handleRemoveCategory}
                />
              )
            })}
          </div>
        </div>
      </div>

      <EditCategory
        category={editCategory}
        onClose={handleCloseDrawer}
      />
    </div>
  )
}