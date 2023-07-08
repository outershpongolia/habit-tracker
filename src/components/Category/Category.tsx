import React, { useCallback } from 'react'
import './Category.scss'
import { CgClose } from 'react-icons/cg'

interface ICategoryProps {
    category: string
    onDeleteCategory: (category: string) => void
}

export const Category: React.FC<ICategoryProps> = ({ category, onDeleteCategory }) => {
    const handleDeleteCategory = useCallback(() => {
        onDeleteCategory(category)
    }, [onDeleteCategory, category])

    return (
        <div className='category'>
            {category}

            <CgClose className='category__icon' onClick={handleDeleteCategory} />
        </div>
    )
}