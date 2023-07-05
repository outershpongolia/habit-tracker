import React, { useCallback } from "react"
import './FileInput.scss'

interface IFileInputProps {
    label: string
    onFileSelected: (file: File) => void
}

export const FileInput: React.FC<IFileInputProps> = ({ label, onFileSelected }) => {
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            onFileSelected(file)
        }
    }, [onFileSelected])

    return (
        <div className="file-input input__label">
            {label}

            <input
                className="file-input__input"
                type='file'
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    )
}