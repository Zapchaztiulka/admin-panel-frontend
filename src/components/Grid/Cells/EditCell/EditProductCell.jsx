import { EditIcon } from '@/components/Icons/Grid/EditIcon'
import { Link } from 'react-router-dom'

export default function EditProductCell({ data }) {
  return (
    <Link to={`${data?._id}`}>
      <EditIcon />
    </Link>
  );
}