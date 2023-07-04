import React, { useCallback } from "react"
import './FileInput.scss'

interface IFileInputProps {
    onFileSelected: (file: File) => void
}

export const FileInput: React.FC<IFileInputProps> = ({ onFileSelected }) => {
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            onFileSelected(file)
        }
    }, [onFileSelected])

    return (
        <input className='file-input' type='file' accept="image/*" onChange={handleFileChange} />
    )
}