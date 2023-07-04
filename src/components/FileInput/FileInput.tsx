import React, { useCallback } from "react"

interface IFileInputProps {
    onFileSelected: (file: File) => void
    className?: string
}

export const FileInput: React.FC<IFileInputProps> = ({ onFileSelected, className }) => {
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            onFileSelected(file)
        }
    }, [onFileSelected])

    return (
        <input
            className={className}
            type='file'
            accept="image/*"
            onChange={handleFileChange}
        />
    )
}