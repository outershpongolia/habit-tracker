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
    
    const [ selectedFile, setSelectedFile ] = useState<File | null>(null)
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
    
    const handleOnSelectFile = useCallback((file: File) => {
        setSelectedFile(file)
    }, [setSelectedFile])

    const handleUploadFile = useCallback(async () => {
        if (!user) {
            return
        }

        if (selectedFile) {
            const formData = await toBase64(selectedFile)

            upload({userId: user.id, files: formData as string})

            setInputValue(inputValue => {
                return {
                    ...inputValue,
                    avatar: selectedFile
                }
            })
        }

        handleToast(EStatus.SUCCESS, 'Image uploaded.')
    }, [selectedFile, user, setInputValue])

    const handleSaveChanges = useCallback(() => {
        setUser(user => {
            if (!user) {
                return null
            }

            return {
                ...user,
                name: inputValue.name,
                data: inputValue.avatar ? {...user.data, avatar: inputValue.avatar} : null
            }
        })
    }, [setUser, inputValue])

    console.log(!selectedFile)

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

                <div className="general__wrapper input__wrapper">
                    <div className="input__label">Avatar</div>
                    
                    <div className="general__file">
                        <FileInput className="general__file-input" onFileSelected={handleOnSelectFile} />

                        <Button
                            className="general__button"
                            label='upload'
                            onClick={handleUploadFile}
                            isDisabled={!selectedFile}
                        />
                    </div>
                </div>

                <Input
                    label='Email'
                    type='email'
                    value={inputValue.email}
                    onChange={handleInputOnChange}
                    placeholder={user.email}
                    name='email'
                />

                <div className="general__save">
                    <Button label='save changes' onClick={handleSaveChanges} />
                </div>
            </div>
        </div>
    )
}