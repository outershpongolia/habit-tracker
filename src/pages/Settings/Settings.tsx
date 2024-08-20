import React, { useCallback } from "react"
import './Settings.scss'
import { Header } from "../../components/Header/Header"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"

interface ISettingsProps {}

export const Settings: React.FC<ISettingsProps> = () => {
  const handleCategoryInput = useCallback(() => {

  }, [])

  return (
    <div className="settings page">
      <Header label="Settings">
        <Button
          label="Save changes"
          onClick={() => null}
        />
      </Header>

      <div className="settings__section white-container">
        <div className="settings__title">Add category for your trackers</div>

        <Input
          value={""}
          name={""}
          label="category"
          onChange={handleCategoryInput}
        />

        <div className="settings__list">
          {/* TO DO: array of categories maps CategoryListItem */}
        </div>
      </div>
    </div>
  )
}