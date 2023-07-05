import React, { useCallback, useContext, useState } from "react"
import './General.scss'
import { FileInput } from "../../../components/FileInput/FileInput"
import { Button } from "../../../components/Button/Button"
import { toBase64 } from "../../../utilities"
import { upload } from "../../../api/users"
import { UserContext } from "../../../context/UserContext"
import { Input } from "../../../components/Input/Input"
import { AlertContext } from "../../../context/AlertContext"
import { EStatus } from "../../../constants"

interface IGeneralProps {}

export const General: React.FC<IGeneralProps> = () => {
    const { user, setUser } = useContext(UserContext)
    const { handleToast } = useContext(AlertContext)
    
    const [ inputValue, setInputValue ] = useState<{name: string, avatar: File | null, email: string}>({
        name: '',
        avatar: null,
        email: ''
    })

    const handleInputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputValue => {
            return {
                ...inputValue,
                [e.target.name]: e.target.value
            }
        })
    }, [setInputValue])
    
    const handleOnSelectFile = useCallback(async (file: File) => {
        if (!user) {
            return
        }

        const formData = await toBase64(file)

        upload({userId: user.id, files: formData as string})

        setInputValue(inputValue => {
            return {
                ...inputValue,
                avatar: file
            }
        })

        handleToast(EStatus.SUCCESS, 'Image uploaded.')
    }, [user, setInputValue, handleToast])

    // const handleUploadFile = useCallback(async () => {
        
    // }, [selectedFile, user, setInputValue])

    const handleSaveChanges = useCallback(() => {
        setUser(user => {
            if (!user) {
                return null
            }

            return {
                ...user,
                name: inputValue.name ? inputValue.name : user.name,
                data: inputValue.avatar
                    ? {...user.data, avatar: inputValue.avatar}
                    : {
                        ...user.data, 
                        avatar: user?.data?.avatar ? user.data.avatar : null
                    }
            }
        })
    }, [setUser, inputValue])

    if (!user) return <></>

    return (
        <div className="general">
            <div className="general__container">
                <Input
                    label='Name'
                    value={inputValue.name}
                    onChange={handleInputOnChange}
                    placeholder={user.name}
                    name='name'
                />

                <Input
                    label='Email'
                    type='email'
                    value={inputValue.email}
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
            </div>
        </div>
    )
}