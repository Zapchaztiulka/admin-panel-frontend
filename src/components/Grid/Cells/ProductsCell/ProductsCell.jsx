import React from 'react'
import { Link } from 'react-router-dom'


const ProductsCell = ({value, data}) => {
  return (
    <div className='text-textBrand'>
      <Link to={`details/${data._id}`}>{value ? value.length : 0} товари</Link>
    </div>
  )
}

export default ProductsCell