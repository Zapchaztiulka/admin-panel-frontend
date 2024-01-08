import React from 'react'

export default function CheckboxCell({ value, }) {
    return (
        <div><input type='checkbox' checked={value} onChange={() => { }} /></div>
    )
}
