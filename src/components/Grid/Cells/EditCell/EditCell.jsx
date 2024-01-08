import { EditIcon } from '@/components/Icons/Grid/EditIcon'
import React from 'react'
import { Link } from 'react-router-dom'

export default function EditCell({ id}) {
    return (
        <Link to={`details/${id}`}><EditIcon /></Link>
    )
}