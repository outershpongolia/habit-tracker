import React, { useCallback, useContext, useState } from "react"
import './Profile.scss'
import { UserContext } from "../../context/UserContext"
import { FileInput } from "../../components/FileInput/FileInput"
import { Button } from "../../components/Button/Button"
import { toBase64 } from "../../utilities"
import { upload } from "../../api/users"

interface IProfileProps {}

export const Profile: React.FC<IProfileProps> = () => {
    const { user } = useContext(UserContext)

    const [ selectedFile, setSelectedFile ] = useState<File | null>(null)

    const handleOnSelectFile = useCallback((file: File) => {
        setSelectedFile(file)
    }, [setSelectedFile])

    const handleUploadFile = useCallback(async () => {
        if (!user) return

        if (selectedFile) {
            const formData = await toBase64(selectedFile)

            upload({userId: user.id, files: formData as string})
        }
    }, [selectedFile, user])

    if (!user) return <></>

    return (
        <div className="profile">
            {/*Header section with profile info*/}
            <div className="profile__header">
                <div className="profile__avatar">

                    {selectedFile && 
                        <img className="profile__avatar-img" src={URL.createObjectURL(selectedFile)} alt="Avatar" />
                    }
                </div>

                <div>
                    <div className="profile__name profile__text">{user.name}</div>
                    <div className="profile__email profile__text">{user.email}</div>
                </div>
            </div>

            {/*Tabs section with all settings options*/}
            <FileInput onFileSelected={handleOnSelectFile} />
            <Button label='Upload' onClick={handleUploadFile} />
        </div>
    )
}