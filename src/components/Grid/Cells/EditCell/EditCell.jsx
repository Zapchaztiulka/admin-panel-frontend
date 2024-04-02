import { EditIcon } from '@/components/Icons/Grid/EditIcon'
import { Link } from 'react-router-dom'

export default function EditCell({ data }) {
    return (
        <Link to={`details/${data._id}`}><EditIcon /></Link>
    )
}