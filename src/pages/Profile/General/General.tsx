import React, { useCallback, useContext } from "react"
import './General.scss'
import { FileInput } from "../../../components/FileInput/FileInput"
import { Button } from "../../../components/Button/Button"
import { toBase64 } from "../../../utilities"
import { upload } from "../../../api/users"
import { UserContext } from "../../../context/UserContext"
import { Input } from "../../../components/Input/Input"
import { AlertContext } from "../../../context/AlertContext"
import { EStatus } from "../../../constants"
import { ProfileSetup } from "../../../components/ProfileSetup/ProfileSetup"

interface IGeneralProps {}

export const General: React.FC<IGeneralProps> = () => {
    const { user, setUser, inputData, setInputData, handleInputOnChange } = useContext(UserContext)
    const { handleToast } = useContext(AlertContext)
    
    const handleOnSelectFile = useCallback(async (file: File) => {
        if (!user) return

        const formData = await toBase64(file)

        upload({userId: user.id, files: formData as string})

        handleToast(EStatus.SUCCESS, 'Image uploaded.')
    }, [user, setInputData, handleToast])

    const handleSaveChanges = useCallback(() => {
        if (!user) return

        setUser(user => {
            if (!user) return null

            return {
                ...user,
                name: inputData.newName ? inputData.newName : user.name,
                email: inputData.email ? inputData.email : user.email
            }
        })
    }, [user, inputData])

    if (!user) return <></>

    return (
        <div className="general">
            <ProfileSetup
                title='Profile info'
                description='Change your name, email and avatar.'
                type='info'
            >
                <Input
                    label='Name'
                    value={inputData.newName}
                    onChange={handleInputOnChange}
                    placeholder={user.name}
                    name='newName'
                />

                <Input
                    label='Email'
                    type='email'
                    value={inputData.email}
                    onChange={handleInputOnChange}
                    placeholder={user.email}
                    name='email'
                />

                <div className="general__wrapper">
                    <div className="input__label">Avatar</div>

                    <FileInput
                        label='upload image'
                        onFileSelected={handleOnSelectFile}
                    />
                </div>

                <div className="general__save">
                    <Button label='save changes' onClick={handleSaveChanges} />
                </div>
            </ProfileSetup>
        </div>
    )
}